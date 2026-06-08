// Lightweight SQLite database layer — single file, zero dependencies
// Uses better-sqlite3 for sync operations (fast, simple)

import Database from 'better-sqlite3'
import path from 'path'
import { randomBytes, createHash } from 'crypto'

const DB_PATH = path.join(process.cwd(), 'data', 'v26.db')

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    migrate(db)
  }
  return db
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS pending_bookings (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      package_id TEXT NOT NULL,
      package_name TEXT NOT NULL,
      package_price REAL NOT NULL,
      wallet_id TEXT NOT NULL,
      wallet_address TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      tx_timestamp TEXT,
      tx_id TEXT
    );

    CREATE TABLE IF NOT EXISTS purchases (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      email TEXT NOT NULL,
      package_id TEXT NOT NULL,
      package_name TEXT NOT NULL,
      wallet_id TEXT NOT NULL,
      wallet_address TEXT NOT NULL,
      tx_id TEXT,
      amount REAL NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `)
}

// ── User functions ─────────────────────────────────────────

export function createUser(email: string, name: string, password: string) {
  const db = getDb()
  const id = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(password).digest('hex')
  db.prepare('INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)').run(id, email, hash)
  return { id, email, name }
}

export function getUserByEmail(email: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any || null
}

export function getUserById(id: string) {
  const db = getDb()
  return db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').get(id) as any || null
}

export function verifyPassword(email: string, password: string) {
  const user = getUserByEmail(email)
  if (!user) return null
  const hash = createHash('sha256').update(password).digest('hex')
  if (user.password_hash !== hash) return null
  return { id: user.id, email: user.email, name: user.name }
}

// ── Booking functions ──────────────────────────────────────

export function createPendingBooking(email: string, name: string, pkgId: string, pkgName: string, pkgPrice: number, walletId: string, walletAddress: string) {
  const db = getDb()
  const id = randomBytes(12).toString('hex')
  db.prepare(`
    INSERT INTO pending_bookings (id, email, name, package_id, package_name, package_price, wallet_id, wallet_address)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, email, name, pkgId, pkgName, pkgPrice, walletId, walletAddress)
  return id
}

export function getPendingBooking(id: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM pending_bookings WHERE id = ?').get(id) as any || null
}

export function getRecentPendingBookings(walletId: string) {
  const db = getDb()
  return db.prepare(`
    SELECT * FROM pending_bookings 
    WHERE wallet_id = ? AND status = 'pending' 
    ORDER BY created_at DESC
  `).all(walletId) as any[]
}

export function confirmBooking(id: string, txId?: string) {
  const db = getDb()
  db.prepare(`
    UPDATE pending_bookings SET status = 'confirmed', tx_id = ?, tx_timestamp = datetime('now')
    WHERE id = ?
  `).run(txId || null, id)
}

// ── Purchase functions ─────────────────────────────────────

export function createPurchase(userId: string, email: string, pkgId: string, pkgName: string, walletId: string, walletAddress: string, amount: number, txId?: string) {
  const db = getDb()
  const id = randomBytes(12).toString('hex')
  db.prepare(`
    INSERT INTO purchases (id, user_id, email, package_id, package_name, wallet_id, wallet_address, amount, tx_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, email, pkgId, pkgName, walletId, walletAddress, amount, txId || null)
  return id
}

export function getUserPurchases(userId: string) {
  const db = getDb()
  return db.prepare('SELECT * FROM purchases WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[]
}

export function getAllPendingBookings() {
  const db = getDb()
  return db.prepare("SELECT * FROM pending_bookings WHERE status = 'pending' ORDER BY created_at ASC").all() as any[]
}

// Generate a random readable password
export function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#'
  let pw = ''
  for (let i = 0; i < 14; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)]
  }
  return pw
}

// ── Session functions ──────────────────────────────────────

export function createSession(userId: string): string {
  const db = getDb()
  const id = randomBytes(24).toString('hex')
  db.prepare('INSERT INTO sessions (id, user_id) VALUES (?, ?)').run(id, userId)
  return id
}

export function getSession(sessionId: string) {
  const db = getDb()
  return db.prepare(`
    SELECT s.id as session_id, u.id as user_id, u.email, u.name, u.created_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.id = ?
  `).get(sessionId) as any || null
}

export function deleteSession(sessionId: string) {
  const db = getDb()
  db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId)
}

export function close() {
  if (db) { db.close(); db = null }
}
