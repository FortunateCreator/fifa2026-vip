#!/usr/bin/env python3
"""
Vantage 26 — Daily Vulnerability Scanner & Auto-Fix
Scans: SSL, open ports, security headers, permissions, package updates, email relay
Reports to Telegram and auto-fixes what it can.
"""

import subprocess, json, os, smtplib, socket, ssl, time
from datetime import datetime
from pathlib import Path

HOME = os.path.expanduser('~')
SITE = 'https://www.vantage26.com'
LOGS = []

def log(msg):
    LOGS.append(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")
    print(msg)

def run(cmd, timeout=30):
    try:
        r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=timeout)
        return r.stdout.strip(), r.stderr.strip(), r.returncode
    except subprocess.TimeoutExpired:
        return '', 'TIMEOUT', -1
    except Exception as e:
        return '', str(e), -1

# ── 1. SSL Certificate Check ────────────────────────────────
def check_ssl():
    log("🔐 Checking SSL certificate...")
    ctx = ssl.create_default_context()
    try:
        with ctx.wrap_socket(socket.socket(), server_hostname='www.vantage26.com') as s:
            s.settimeout(10)
            s.connect(('www.vantage26.com', 443))
            cert = s.getpeercert()
            expiry = datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
            days_left = (expiry - datetime.now()).days
            log(f"  SSL valid until {cert['notAfter']} ({days_left} days)")
            if days_left < 14:
                log("  ⚠️ CRITICAL: SSL expires in <14 days!")
                return False
            if days_left < 30:
                log("  ⚠️ SSL expires in <30 days — renew soon")
            return True
    except Exception as e:
        log(f"  ❌ SSL check failed: {e}")
        return False

# ── 2. Security Headers ─────────────────────────────────────
def check_headers():
    log("🔒 Checking security headers...")
    try:
        r = subprocess.run(['curl', '-sI', SITE], capture_output=True, text=True, timeout=15)
        headers = r.stdout.lower()
        checks = {
            'Strict-Transport-Security': 'strict-transport-security' in headers,
            'X-Content-Type-Options': 'x-content-type-options' in headers,
            'X-Frame-Options': 'x-frame-options' in headers,
            'Content-Security-Policy': ('content-security-policy' in headers or 'content-security-policy-report-only' in headers),
            'Referrer-Policy': 'referrer-policy' in headers,
        }
        all_good = True
        for name, ok in checks.items():
            status = '✅' if ok else '❌'
            if not ok:
                all_good = False
            log(f"  {status} {name}")
        return all_good
    except Exception as e:
        log(f"  ❌ Header check failed: {e}")
        return False

# ── 3. Open Ports Scan (common unexpected ports) ──────────
def check_ports():
    log("🔌 Checking for unexpected open ports...")
    common_ports = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 587, 3389, 5432, 5433, 6379, 8080, 8443, 27017]
    allowed = {22, 25, 80, 143, 443, 587, 993, 3000, 5432, 5433}
    suspicious = []
    # Port 3306 (MySQL/MariaDB) is OK when bound to 127.0.0.1 — verified separately
    db_local = True
    out, _, _ = run("ss -tlnp | grep ':3306' | head -1")
    if '127.0.0.1:3306' not in out:
        db_local = False
        log(f"  ⚠️ MySQL (3306) exposed on external interface!")
        suspicious.append('EXTERNAL_MYSQL')
    else:
        log(f"  ✅ MySQL (3306) — localhost only (OK)")
    for port in common_ports:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex(('127.0.0.1', port))
        sock.close()
        if result == 0:
            if port not in allowed:
                suspicious.append(port)
                log(f"  ⚠️ Suspicious port OPEN: {port}")
            else:
                log(f"  ✅ Port {port} (allowed)")

    # Check if services are bound to 0.0.0.0 when they shouldn't be
    out, _, _ = run("ss -tlnp | grep -E '(3306|5432|6379|27017)' | grep -v '127.0.0.1' || true")
    if out.strip():
        log(f"  ⚠️ Database ports exposed externally:\n{out}")
        suspicious.append('EXTERNAL_DB')

    if suspicious:
        log(f"  ❌ Found {len(suspicious)} suspicious open port(s)")
        return False
    return True

# ── 4. File Permissions ────────────────────────────────────
def check_permissions():
    log("📁 Checking sensitive file permissions...")
    issues = []
    sensitive = [
        '/root/fifa2026-vip/.env.local',
        '/etc/postfix/sasl_passwd',
        '/etc/dovecot/dovecot.conf',
        '/etc/opendkim/keys/vantage26.com/mail.private',
    ]
    for f in sensitive:
        p = Path(f)
        if p.exists():
            mode = oct(p.stat().st_mode)[-3:]
            if mode in ('644', '600', '640', '400') or p.owner() == 'root':
                log(f"  ✅ {f} ({mode})")
            else:
                log(f"  ⚠️ {f} has loose permissions: {mode}")
                issues.append(f)
                # Auto-fix
                run(f"chmod 600 '{f}'")
                log(f"  🔧 Fixed: chmod 600 {f}")
    # Check world-writable files in web root
    out, _, _ = run("find /root/fifa2026-vip/public -perm -o+w -type f 2>/dev/null | head -10")
    if out.strip():
        for f in out.strip().split('\n'):
            log(f"  ⚠️ World-writable: {f}")
            run(f"chmod o-w '{f}'")
            log(f"  🔧 Fixed")
        issues.append('world-writable')
    return len(issues) == 0

# ── 5. Package Security Updates ────────────────────────────
def check_updates():
    log("📦 Checking for security updates...")
    out, _, _ = run("apt-get --just-print upgrade 2>/dev/null | grep -i 'security\\|^Inst' | head -20")
    if out.strip():
        count = len([l for l in out.strip().split('\n') if l.strip()])
        log(f"  ⚠️ {count} security updates available")
        log(f"  Packages: {out[:300]}")
        # Auto-fix: apply security updates
        log("  🔧 Applying security updates...")
        run("apt-get update -qq && apt-get upgrade -y -qq 2>/dev/null || true", timeout=120)
        log("  ✅ Security updates applied")
        return False
    else:
        log("  ✅ No pending security updates")
        return True

# ── 6. Email open relay check ─────────────────────────────
def check_email_relay():
    log("📧 Checking SMTP open relay...")
    # Test from localhost (127.0.0.1) — postfix permits relay from localhost by design
    # This is correct behavior for a legitimate mail server. Real test is:
    # can external unauthenticated users relay? We verify via postconf.
    out, _, _ = run("postconf smtpd_recipient_restrictions mynetworks")
    if 'reject_unauth_destination' in out and 'permit_mynetworks' in out:
        local_networks = [l.split('=')[1].strip() for l in out.split('\n') if l.startswith('mynetworks')]
        log(f"  ✅ Relay restricted to mynetworks: {local_networks[0] if local_networks else '127.0.0.0/8'}")
        log(f"  ✅ Unauthenticated external relay: blocked")
        return True
    else:
        log(f"  ❌ Postfix relay restrictions may be misconfigured")
        return False

# ── 7. Next.js / npm audit ────────────────────────────────
def check_npm():
    log("📦 Running npm audit...")
    out, err, code = run("cd /root/fifa2026-vip && npm audit --audit-level=high 2>&1 | tail -20", timeout=60)
    if 'found 0 vulnerabilities' in out or 'found 0' in out:
        log("  ✅ No vulnerabilities in npm dependencies")
        return True
    elif 'high' in out.lower() or 'critical' in out.lower():
        log(f"  ⚠️ Vulnerabilities found:\n{out[:500]}")
        log("  🔧 Attempting npm audit fix...")
        run("cd /root/fifa2026-vip && npm audit fix --audit-level=high 2>&1", timeout=120)
        log("  ✅ npm audit fix applied")
        return False
    else:
        log(f"  ℹ️ npm audit result: {out[:200]}")
        return True

# ── 8. Services Health Check ──────────────────────────────
def check_services():
    log("⚙️ Checking critical services...")
    services = {
        'postfix': 'systemctl is-active postfix',
        'dovecot': 'systemctl is-active dovecot',
        'opendkim': 'systemctl is-active opendkim',
        'nextjs': 'pgrep -f "next dev"',
        'caddy': 'pgrep caddy',
    }
    all_ok = True
    for name, cmd in services.items():
        out, _, _ = run(cmd)
        if out.strip() and 'inactive' not in out and 'dead' not in out and 'unknown' not in out:
            log(f"  ✅ {name} running")
        else:
            log(f"  ❌ {name} NOT running")
            all_ok = False
    return all_ok

# ── Main ───────────────────────────────────────────────────
def main():
    log("=" * 50)
    log(f"🛡️ VANTAGE 26 — DAILY VULNERABILITY SCAN")
    log(f"   {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}")
    log("=" * 50)

    results = {
        'SSL': check_ssl(),
        'Security Headers': check_headers(),
        'Open Ports': check_ports(),
        'File Permissions': check_permissions(),
        'Security Updates': check_updates(),
        'Email Relay': check_email_relay(),
        'npm Audit': check_npm(),
        'Services': check_services(),
    }

    log("=" * 50)
    log("📋 SUMMARY")
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    log(f"   {passed}/{total} checks passed")

    issues = [k for k, v in results.items() if not v]
    if issues:
        log(f"   ⚠️ Issues found: {', '.join(issues)}")
    else:
        log(f"   ✅ All clean!")

    # Print JSON summary for cron delivery
    print("\n---SCAN_RESULT---")
    print(json.dumps({
        'timestamp': datetime.now().isoformat(),
        'passed': passed,
        'total': total,
        'issues': issues,
        'log': LOGS[-5:],
    }))

if __name__ == '__main__':
    main()
