#!/usr/bin/env python3
"""
Blockchain Checker — polls all Vantage 26 crypto wallets every 10 minutes.
Writes to data/payment-cache.json. Lightweight: ~2KB cache, ~5s total runtime.
"""
import json, os, sys, time, subprocess
from urllib.request import urlopen, Request
from urllib.error import URLError

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(BASE, 'data', 'payment-cache.json')
TIMEOUT = 10

# Wallet definitions (mirrors src/lib/data.ts)
WALLETS = {
    'btc': {'address': 'bc1qsma38ulsfdttz68ay53pjmk7rg3pt30q9ej99z', 'api': 'https://blockstream.info/api/address/'},
    'evm': {'address': '0xAed3734Fd468997D2276F9135CFC90c3A7aff9A4', 'api': 'https://eth.blockscout.com/api/v2/addresses/'},
    'usdt': {'address': 'TJassXnUTZeQMtR5KULPHBpFryXevxntWu', 'api': 'https://api.trongrid.io/v1/accounts/'},
    'bch': {'address': 'bitcoincash:qqe8kx9axk4qjv9wzdz0zszg6klrgefucj8vl7uxh', 'api': 'blockbook'},
    'xrp': {'address': 'rMZuai5PyR6RuRxnjLp1QPzQVWYF6A9gA', 'api': 'https://api.xrpscan.com/api/v1/account/'},
    'doge': {'address': 'DGhmz775P55msjL4YtJqg8VSWkEoSbzzif', 'api': 'blockcypher'},
    'ltc': {'address': 'ltc1qx80ktv4q4v2mvqk29gm6nwj0zn5gl64ht6a9zf', 'api': 'blockcypher'},
}

def fetch_json(url, timeout=TIMEOUT):
    """Fetch JSON from URL with timeout."""
    try:
        req = Request(url, headers={'User-Agent': 'Vantage26/1.0'})
        with urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode())
    except Exception as e:
        return {'_error': str(e)}

def check_blockstream(addr):
    """BTC via blockstream.info — returns tx_count."""
    data = fetch_json(f"https://blockstream.info/api/address/{addr}")
    if '_error' in data:
        return 0, data['_error']
    # Sum confirmed + unconfirmed tx count
    chain_stats = data.get('chain_stats', {})
    mempool = data.get('mempool_stats', {})
    return chain_stats.get('tx_count', 0) + mempool.get('tx_count', 0), None

def check_blockchair(addr, chain):
    """Blockchair API — fallback. Returns tx_count."""
    data = fetch_json(f"https://api.blockchair.com/{chain}/dashboards/address/{addr}")
    if '_error' in data:
        return 0, data['_error']
    result = data.get('data', {})
    keys = list(result.keys())
    if keys:
        result = result[keys[0]]
    addr_data = result.get('address', {})
    return addr_data.get('tx_count', 0), None

def check_xrp(addr):
    """XRP via xrpscan."""
    data = fetch_json(f"https://api.xrpscan.com/api/v1/account/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('transactionCount', 0) or data.get('transaction_count', 0) or 0, None

def check_blockscout(addr):
    """ETH/EVM via Blockscout — free, no key."""
    data = fetch_json(f"https://eth.blockscout.com/api/v2/addresses/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('tx_count', 0) or 0, None

def check_trongrid(addr):
    """USDT TRC-20 via TronGrid."""
    data = fetch_json(f"https://api.trongrid.io/v1/accounts/{addr}")
    if '_error' in data:
        return 0, data['_error']
    # Look for total transaction count from account data
    d = data if isinstance(data, dict) else {}
    return d.get('total_transactions', 0) or 0, None

def cashaddr_to_legacy(cashaddr):
    """Convert BCH cashaddr (without prefix) to legacy P2SH address."""
    try:
        charset = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
        addr_clean = cashaddr.replace('bitcoincash:', '').lower()
        five_bit = [charset.index(c) for c in addr_clean]
        payload_5bit = five_bit[:-8]  # strip checksum (last 8 chars)
        payload_5bit = payload_5bit[1:]  # strip version byte
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
        import hashlib
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

def check_bch_blockbook(addr):
    """BCH via Blockbook API (bchblockexplorer.com)."""
    import hashlib
    legacy = cashaddr_to_legacy(addr)
    if not legacy:
        return 0, 'could not convert address'
    data = fetch_json(f"https://bchblockexplorer.com/api/v2/address/{legacy}")
    if '_error' in data:
        return 0, data['_error']
    # Blockbook returns txs array (or 0 if empty), plus unconfirmed
    txs = data.get('txs', [])
    if isinstance(txs, int):
        txs = 0
    else:
        txs = len(txs)
    unconfirmed = data.get('unconfirmedTxs', 0)
    return txs + unconfirmed, None

def check_blockcypher(addr, coin):
    """DOGE/LTC via Blockcypher — free, no key needed, reliable."""
    data = fetch_json(f"https://api.blockcypher.com/v1/{coin}/main/addrs/{addr}")
    if '_error' in data:
        return 0, data['_error']
    return data.get('final_n_tx', 0) + data.get('unconfirmed_n_tx', 0), None

def main():
    # Load existing cache
    cache = {}
    if os.path.exists(CACHE):
        try:
            with open(CACHE) as f:
                cache = json.load(f)
        except (json.JSONDecodeError, IOError):
            cache = {}

    now = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    results = {}

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
            elif wid == 'xrp':
                tx_count, error = check_xrp(addr)
            elif wid == 'bch':
                tx_count, error = check_bch_blockbook(addr)
            elif wid == 'doge':
                tx_count, error = check_blockcypher(addr, 'doge')
            elif wid == 'ltc':
                tx_count, error = check_blockcypher(addr, 'ltc')
        except Exception as e:
            error = str(e)

        prev = cache.get(wid, {})
        prev_count = prev.get('tx_count', 0)
        new_tx = tx_count > prev_count

        results[wid] = {
            'tx_count': tx_count,
            'last_tx': now if new_tx else prev.get('last_tx'),
            'amount': None,  # Exact amount matching is done by concierge
            'checked_at': now,
            'confirmed': new_tx or prev.get('confirmed', False) if tx_count > 0 else False,
            'error': error,
        }

        status = '+' if new_tx else '='
        print(f"  [{status}] {wid}: {tx_count} tx{' ' + ('(NEW!)' if new_tx else '')}{' | err: ' + error[:50] if error else ''}")

        # If new transaction detected, trigger booking confirmation
        if new_tx and error is None:
            try:
                script = os.path.join(BASE, 'scripts', 'confirm_bookings.js')
                subprocess.run(['node', script, wid], capture_output=True, text=True, timeout=15)
                print(f"  🔔 Confirmation triggered for {wid}")
            except Exception as e:
                print(f"  ⚠️ Confirmation script failed: {e}")

    # Write cache
    os.makedirs(os.path.dirname(CACHE), exist_ok=True)
    with open(CACHE, 'w') as f:
        json.dump(results, f, indent=2)

    print(f"  ✅ Cache written ({len(results)} wallets)")

    # Return results as JSON for potential cron consumption
    print("\n---CACHE_UPDATED---")
    print(json.dumps({'status': 'ok', 'wallets': len(results), 'updated': now}))

if __name__ == '__main__':
    print(f"🔗 Vantage 26 — Blockchain Checker ({time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())})")
    main()
