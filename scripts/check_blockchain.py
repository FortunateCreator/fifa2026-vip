#!/usr/bin/env python3
"""
Blockchain Checker — polls all Vantage 26 crypto wallets every 10 minutes.
- Only checks wallets when pending bookings exist
- When new TX detected, shows customer info for targeted notification
- Writes to data/payment-cache.json
"""
import json, os, sys, time, hashlib, sqlite3
from urllib.request import urlopen, Request
from urllib.error import URLError

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(BASE, 'data', 'payment-cache.json')
DB = os.path.join(BASE, 'data', 'v26.db')
TIMEOUT = 10

# Wallet definitions
WALLETS = {
    'btc': {'address': 'bc1qsma38ulsfdttz68ay53pjmk7rg3pt30q9ej99z', 'api': 'blockstream'},
    'evm': {'address': '0xAed3734Fd468997D2276F9135CFC90c3A7aff9A4', 'api': 'blockscout'},
    'usdt': {'address': 'TJassXnUTZeQMtR5KULPHBpFryXevxntWu', 'api': 'trongrid'},
    'bch': {'address': 'bitcoincash:qqe8kx9axk4qjv9wzdz0zszg6klrgefucj8vl7uxh', 'api': 'blockbook'},
    'xrp': {'address': 'rMZuai5PyR6RuRxnjLp1QPzQVWYF6A9gA', 'api': 'xrpscan'},
    'doge': {'address': 'DGhmz775P55msjL4YtJqg8VSWkEoSbzzif', 'api': 'blockcypher'},
    'ltc': {'address': 'ltc1qx80ktv4q4v2mvqk29gm6nwj0zn5gl64ht6a9zf', 'api': 'blockcypher'},
}

def fetch_json(url, timeout=TIMEOUT):
    try:
        req = Request(url, headers={'User-Agent': 'Vantage26/1.0'})
        with urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        return {'_error': str(e)}

def cashaddr_to_legacy(cashaddr):
    """Convert BCH cashaddr to legacy P2SH address."""
    try:
        charset = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
        addr_clean = cashaddr.replace('bitcoincash:', '').lower()
        five_bit = [charset.index(c) for c in addr_clean]
        payload_5bit = five_bit[:-8]
        payload_5bit = payload_5bit[1:]
        eight_bit = []
        for i in range(0, len(payload_5bit), 8):
            chunk = payload_5bit[i:i+8]
            if len(chunk) < 5:
                break
            acc = 0
            bits = 0
            for val in chunk:
                acc = (acc << 5) | val
                bits += 5
            while bits >= 8:
                bits -= 8
                eight_bit.append((acc >> bits) & 0xFF)
        hash160 = bytes(eight_bit[:20])
        payload = b'\x05' + hash160
        checksum = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
        alphabet = b'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
        n = int.from_bytes(payload + checksum, 'big')
        res = []
        while n > 0:
            n, r = divmod(n, 58)
            res.append(alphabet[r])
        return bytes(reversed(res)).decode()
    except Exception as e:
        return None

def check_blockstream(addr):
    data = fetch_json(f"https://blockstream.info/api/address/{addr}")
    if '_error' in data:
        return 0, data['_error']
    chain_stats = data.get('chain_stats', {})
    mempool = data.get('mempool_stats', {})
    return chain_stats.get('tx_count', 0) + mempool.get('tx_count', 0), None

def check_blockscout(addr):
    data = fetch_json(f"https://eth.blockscout.com/api/v2/addresses/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('tx_count', 0) or 0, None

def check_trongrid(addr):
    data = fetch_json(f"https://api.trongrid.io/v1/accounts/{addr}")
    if '_error' in data:
        return 0, data['_error']
    d = data if isinstance(data, dict) else {}
    return d.get('total_transactions', 0) or 0, None

def check_bch_blockbook(addr):
    legacy = cashaddr_to_legacy(addr)
    if not legacy:
        return 0, 'addr conversion failed'
    data = fetch_json(f"https://bchblockexplorer.com/api/v2/address/{legacy}")
    if '_error' in data:
        return 0, data['_error']
    txs = data.get('txs', [])
    if isinstance(txs, int):
        txs = 0
    else:
        txs = len(txs)
    unconfirmed = data.get('unconfirmedTxs', 0) or 0
    return txs + unconfirmed, None

def check_xrp(addr):
    data = fetch_json(f"https://api.xrpscan.com/api/v1/account/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('transactionCount', 0) or data.get('transaction_count', 0) or 0, None

def check_blockcypher(addr, coin):
    data = fetch_json(f"https://api.blockcypher.com/v1/{coin}/main/addrs/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('final_n_tx', 0) + data.get('unconfirmed_n_tx', 0), None

def get_pending_bookings():
    """Return a dict of wallet_id -> list of pending customers."""
    if not os.path.exists(DB) or os.path.getsize(DB) < 100:
        return {}
    try:
        conn = sqlite3.connect(DB)
        c = conn.cursor()
        c.execute("SELECT wallet_id, wallet_address, email, name, package_name, package_price FROM pending_bookings WHERE status='pending'")
        rows = c.fetchall()
        conn.close()
        by_wallet = {}
        for row in rows:
            wid, addr, email, name, pkg, price = row
            by_wallet.setdefault(wid, []).append({
                'email': email, 'name': name, 'package': pkg, 'price': price, 'address': addr
            })
        return by_wallet
    except Exception as e:
        return {'_error': str(e)}

def get_purchase_for_wallet(wallet_id, wallet_address):
    """Check if a purchase already exists for this wallet address + chain."""
    if not os.path.exists(DB):
        return None
    try:
        conn = sqlite3.connect(DB)
        c = conn.cursor()
        c.execute("SELECT email, package_name FROM purchases WHERE wallet_id=? AND wallet_address=? ORDER BY created_at DESC LIMIT 1",
                  (wallet_id, wallet_address))
        row = c.fetchone()
        conn.close()
        return {'email': row[0], 'package': row[1]} if row else None
    except:
        return None

def main():
    now = time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())
    
    # Check if there are pending bookings
    pending = get_pending_bookings()
    has_pending = bool(pending) and '_error' not in pending
    total_pending = sum(len(v) for v in pending.values()) if has_pending else 0
    
    print(f"🔗 Vantage 26 — Blockchain Checker ({now})")
    
    if not has_pending:
        # Silent exit — cron delivers nothing on empty stdout
        return
    
    print(f"  📋 {total_pending} pending booking(s) across {len(pending)} wallet(s)")
    
    # Load existing cache
    cache = {}
    if os.path.exists(CACHE):
        try:
            with open(CACHE) as f:
                cache = json.load(f)
        except (json.JSONDecodeError, IOError):
            cache = {}
    
    results = {}
    detected_new = []

    for wid, w in WALLETS.items():
        addr = w['address']
        tx_count = 0
        error = None

        try:
            if wid == 'btc':
                tx_count, error = check_blockstream(addr)
            elif wid == 'evm':
                tx_count, error = check_blockscout(addr)
            elif wid == 'usdt':
                tx_count, error = check_trongrid(addr)
            elif wid == 'bch':
                tx_count, error = check_bch_blockbook(addr)
            elif wid == 'xrp':
                tx_count, error = check_xrp(addr)
            elif wid == 'doge':
                tx_count, error = check_blockcypher(addr, 'doge')
            elif wid == 'ltc':
                tx_count, error = check_blockcypher(addr, 'ltc')
        except Exception as e:
            error = str(e)

        prev = cache.get(wid, {})
        prev_count = prev.get('tx_count', 0)
        new_tx = tx_count > prev_count and error is None

        results[wid] = {
            'tx_count': tx_count,
            'last_tx': now if new_tx else prev.get('last_tx'),
            'amount': None,
            'checked_at': now,
            'confirmed': new_tx or prev.get('confirmed', False) if tx_count > 0 else False,
            'error': error,
        }

        status = '+' if new_tx else '='
        print(f"  [{status}] {wid}: {tx_count} tx{' (NEW!)' if new_tx else ''}{' | err: ' + error[:50] if error else ''}")

        # If new transaction detected, look up who it belongs to
        if new_tx:
            # Find which pending booking uses this wallet
            cust_list = pending.get(wid, [])
            for cust in cust_list:
                # Check if this customer hasn't already been processed
                existing = get_purchase_for_wallet(wid, addr)
                if existing:
                    print(f"  👤 Already processed: {cust['name']} ({cust['email']})")
                else:
                    print(f"  💰 Payment detected for {cust['name']} ({cust['email']})")
                    print(f"     Package: {cust['package']} — ${cust['price']:,.0f}")
                    print(f"     Action: run confirm_booking.py to send welcome email")
                    detected_new.append(cust)

    # Write cache
    os.makedirs(os.path.dirname(CACHE), exist_ok=True)
    with open(CACHE, 'w') as f:
        json.dump(results, f, indent=2)

    print(f"  ✅ Cache written ({len(results)} wallets)")

    # Summary
    print(f"\n---CACHE_UPDATED---")
    summary = {
        'status': 'ok',
        'wallets': len(results),
        'pending': total_pending,
        'new_payments': len(detected_new),
        'customers': [c['name'] for c in detected_new],
        'updated': now,
    }
    print(json.dumps(summary))

if __name__ == '__main__':
    main()
