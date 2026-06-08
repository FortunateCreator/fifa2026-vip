#!/usr/bin/env node
/**
 * Confirm Bookings — Script run by blockchain checker when new tx detected.
 * Reads payment-cache.json → finds pending bookings → creates user → sends email
 * 
 * Usage: node scripts/confirm_bookings.js <wallet_id>
 * 
 * Environment variables:
 *   RESEND_API_KEY (optional — skips email if not set)
 */

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { createHash } = require('crypto')

const BASE = path.resolve(__dirname, '..')
const CACHE = path.join(BASE, 'data', 'payment-cache.json')
const DB_PATH = path.join(BASE, 'data', 'v26.db')
const SESSIONS_PATH = path.join(BASE, 'data', 'sessions.json')

const walletId = process.argv[2]
if (!walletId) { console.error('Usage: node confirm_bookings.js <wallet_id>'); process.exit(1) }

// ── SQLite helper ────────────────────────────────────────
const Database = require('better-sqlite3')

function query(sql, ...params) {
  if (!fs.existsSync(DB_PATH)) return []
  const db = new Database(DB_PATH)
  const stmt = db.prepare(sql)
  const result = stmt.all(...params)
  db.close()
  return result
}

function run(sql, ...params) {
  const db = new Database(DB_PATH)
  const stmt = db.prepare(sql)
  const result = stmt.run(...params)
  db.close()
  return result
}

// ── Read cache ────────────────────────────────────────────
let cache = {}
if (fs.existsSync(CACHE)) {
  try { cache = JSON.parse(fs.readFileSync(CACHE, 'utf-8')) } catch {}
}

const walletData = cache[walletId]
if (!walletData || walletData.tx_count <= 0) {
  console.log(`No transactions for ${walletId}, skipping`)
  process.exit(0)
}

// ── Find pending bookings for this wallet ────────────────
const pending = query(
  "SELECT * FROM pending_bookings WHERE wallet_id = ? AND status = 'pending' ORDER BY created_at ASC",
  walletId
)

if (pending.length === 0) {
  console.log(`No pending bookings for ${walletId}`)
  process.exit(0)
}

console.log(`Found ${pending.length} pending booking(s) for ${walletId}`)

// Confirm the oldest pending booking
const booking = pending[0]
const password = generatePassword()
const hash = createHash('sha256').update(password).digest('hex')

// Check if user already exists
const existing = query('SELECT * FROM users WHERE email = ?', booking.email)
let userId

if (existing.length > 0) {
  userId = existing[0].id
  console.log(`User already exists: ${booking.email}`)
} else {
  userId = crypto.randomBytes(16).toString('hex')
  run('INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)',
    userId, booking.email, booking.name, hash)
  console.log(`Created user: ${booking.email}`)
}

// Create purchase
run(`INSERT INTO purchases (id, user_id, email, package_id, package_name, wallet_id, wallet_address, amount, tx_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  crypto.randomBytes(12).toString('hex'),
  userId,
  booking.email,
  booking.package_id,
  booking.package_name,
  booking.wallet_id,
  booking.wallet_address,
  booking.package_price,
  walletData.last_tx || null
)
console.log(`Created purchase: ${booking.package_name} for ${booking.email}`)

// Mark booking confirmed
run("UPDATE pending_bookings SET status = 'confirmed', tx_id = ?, tx_timestamp = datetime('now') WHERE id = ?",
  walletData.last_tx || null, booking.id)
console.log(`Booking ${booking.id.slice(0, 8)} confirmed`)

// Update cache to mark confirmed
if (!cache[walletId]._confirmed_bookings) cache[walletId]._confirmed_bookings = []
cache[walletId]._confirmed_bookings.push(booking.id)
cache[walletId]._last_confirmed = new Date().toISOString()
fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2))

// ── Send email via Resend ─────────────────────────────────
const RESEND_KEY = process.env.RESEND_API_KEY || (() => {
  // Fallback: read from .env.local
  try {
    const envPath = path.join(BASE, '.env.local')
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf-8').split('\n')
      for (const l of lines) {
        const m = l.match(/^RESEND_API_KEY=(.+)$/)
        if (m) return m[1].replace(/^["']|["']$/g, '')
      }
    }
  } catch {}
  return null
})()
if (RESEND_KEY) {
  sendEmail(booking.email, booking.name, password, booking.package_name)
    .then(r => console.log(`Email sent to ${booking.email}: ${r}`))
    .catch(e => console.error(`Email failed: ${e.message}`))
} else {
  console.log(`\n📧 RESEND_API_KEY not set — email NOT sent`)
  console.log(`   Credentials for ${booking.email}:`)
  console.log(`   Email: ${booking.email}`)
  console.log(`   Password: ${password}`)
  console.log(`   Login at: https://www.vantage26.com/login`)
}

// ── Helpers ───────────────────────────────────────────────

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#'
  let pw = ''
  for (let i = 0; i < 14; i++) pw += chars[Math.floor(Math.random() * chars.length)]
  return pw
}

async function sendEmail(to, name, password, packageName) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Vantage 26 <noreply@vantage26.com>',
      to,
      subject: `Welcome to Vantage 26 — Your ${packageName} is confirmed`,
      html: `
        <div style="background:#0A0A0A;padding:40px 20px;font-family:Georgia,serif;">
          <div style="max-width:480px;margin:0 auto;background:#1A1A1A;border:1px solid #B8860B;border-radius:12px;padding:40px;">
            <h1 style="color:#D4A843;text-align:center;font-size:28px;margin-bottom:8px;">Welcome to Vantage 26</h1>
            <p style="color:#9CA3AF;text-align:center;font-size:14px;">Your VIP experience awaits</p>
            <hr style="border-color:#B8860B;opacity:0.3;margin:24px 0;" />
            <p style="color:#E5E7EB;font-size:15px;">Dear ${name},</p>
            <p style="color:#9CA3AF;font-size:14px;line-height:1.6;">
              Your booking for <strong style="color:#D4A843;">${packageName}</strong> has been 
              confirmed. Your account has been created so you can manage your booking and 
              track your VIP experience.
            </p>
            <div style="background:#0A0A0A;border:1px solid #333;border-radius:8px;padding:16px;margin:20px 0;">
              <p style="color:#9CA3AF;font-size:12px;margin-bottom:6px;">YOUR LOGIN CREDENTIALS</p>
              <p style="color:#E5E7EB;font-size:14px;margin:0;">Email: <span style="color:#D4A843;">${to}</span></p>
              <p style="color:#E5E7EB;font-size:14px;margin:4px 0 0;">Password: <span style="color:#D4A843;font-family:monospace;">${password}</span></p>
            </div>
            <a href="https://www.vantage26.com/login" 
               style="display:block;text-align:center;background:#B8860B;color:#000;text-decoration:none;
                      font-weight:bold;padding:14px;border-radius:8px;font-size:15px;margin:24px 0;">
              Sign in to Your Dashboard →
            </a>
            <p style="color:#6B7280;font-size:12px;text-align:center;">
              A dedicated concierge will contact you within 24 hours via encrypted channel 
              to finalize your experience.
            </p>
            <hr style="border-color:#333;margin:24px 0;" />
            <p style="color:#6B7280;font-size:11px;text-align:center;">
              Vantage 26 — Independent luxury hospitality for FIFA World Cup 2026<br/>
              <a href="https://www.vantage26.com" style="color:#D4A843;">www.vantage26.com</a>
            </p>
          </div>
        </div>
      `,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
  return data.id
}
