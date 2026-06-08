#!/usr/bin/env python3
"""
Vantage 26 - Booking Confirmation Email Script
Sends a welcome email to new customers via Resend API.
Usage: python3 confirm_booking.py <email> <name> <package_name> <password>

Example:
  python3 confirm_booking.py customer@email.com "John Doe" "Gold Package" "TempPass123"
"""
import os
import sys
import json
import urllib.request
import urllib.error
import sqlite3
from datetime import datetime

RESEND_KEY = os.environ.get("RESEND_API_KEY", "")
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "vantage26.db")


def send_welcome_email(email: str, name: str, package_name: str, password: str) -> str:
    """Send welcome email via Resend. Returns email ID."""
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="background-color:#0a0a0a;color:#f5f5f5;font-family:Georgia,serif;margin:0;padding:0">
  <table width="100%%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:linear-gradient(135deg,#1a1a2e,#16213e);border:1px solid #c9a84c;border-radius:8px">
    <tr>
      <td style="padding:30px;text-align:center">
        <h1 style="color:#c9a84c;font-size:28px;margin:0">✦ Vantage 26 ✦</h1>
        <p style="color:#a0a0a0;font-size:14px;margin:5px 0 20px">World Cup 2026 VIP Hospitality</p>
        <hr style="border:none;border-top:1px solid #c9a84c;opacity:0.3">
        <h2 style="color:#f5f5f5;font-size:22px">Welcome, {name}!</h2>
        <p style="color:#d0d0d0;font-size:16px;line-height:1.6">
          Thank you for your booking of the <strong style="color:#c9a84c">{package_name}</strong>.
          Your journey to the ultimate World Cup experience begins now.
        </p>
        <div style="background:#0a0a0a;border:1px solid #333;border-radius:6px;padding:15px;margin:20px 0">
          <p style="color:#888;font-size:13px;margin:0 0 8px">Your account credentials:</p>
          <p style="color:#f5f5f5;font-size:14px;margin:0"><strong>Email:</strong> {email}</p>
          <p style="color:#f5f5f5;font-size:14px;margin:5px 0 0"><strong>Password:</strong> {password}</p>
        </div>
        <a href="https://www.vantage26.com/dashboard" style="display:inline-block;background:#c9a84c;color:#0a0a0a;padding:12px 30px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:15px;margin:15px 0">Access Your Dashboard</a>
        <hr style="border:none;border-top:1px solid #333;margin:20px 0">
        <p style="color:#666;font-size:12px">Vantage 26 | FIFA World Cup 2026 VIP Hospitality</p>
      </td>
    </tr>
  </table>
</body>
</html>"""

    text_content = f"""WELCOME TO VANTAGE 26, {name}!

Thank you for booking the {package_name}.

Your account credentials:
  Email: {email}
  Password: {password}

Access your dashboard: https://www.vantage26.com/dashboard
"""

    payload = {
        "from": "Vantage 26 <onboarding@vantage26.com>",
        "to": [email],
        "subject": f"Welcome to Vantage 26, {name}!",
        "html": html_content,
        "text": text_content,
    }

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=data,
        headers={
            "Authorization": f"Bearer {RESEND_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "Vantage26/1.0",
        },
    )

    try:
        resp = urllib.request.urlopen(req)
        result = json.loads(resp.read())
        return result.get("id", "unknown")
    except urllib.error.HTTPError as e:
        print(f"Error sending email: {e.code} {e.read().decode()}")
        sys.exit(1)


def main():
    if len(sys.argv) < 5:
        print(f"Usage: {sys.argv[0]} <email> <name> <package_name> <password>")
        sys.exit(1)

    email = sys.argv[1]
    name = sys.argv[2]
    package_name = sys.argv[3]
    password = sys.argv[4]

    email_id = send_welcome_email(email, name, package_name, password)
    print(f"Email sent: {email_id}")

    # Record in DB
    if os.path.exists(DB_PATH):
        try:
            conn = sqlite3.connect(DB_PATH)
            conn.execute(
                "UPDATE bookings SET email_sent=1, email_sent_at=? WHERE email=?",
                (datetime.utcnow().isoformat(), email),
            )
            conn.commit()
            conn.close()
            print(f"DB updated for {email}")
        except Exception as e:
            print(f"DB update warning: {e}")


if __name__ == "__main__":
    main()
