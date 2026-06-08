// /api/booking/submit — creates a pending booking in the DB and
// records it in the payment cache for follow-up payment monitoring.

import { NextRequest, NextResponse } from 'next/server'
import { createPendingBooking } from '@/lib/db'
import fs from 'fs'
import path from 'path'

const CACHE_PATH = path.join(process.cwd(), 'data', 'payment-cache.json')

interface WalletCache {
  tx_count: number
  last_tx: string | null
  amount: number | null
  checked_at: string
  confirmed: boolean
  booking_ids: string[]
}

type PaymentCache = Record<string, WalletCache>

function readCache(): PaymentCache {
  if (!fs.existsSync(CACHE_PATH)) return {}
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

function writeCache(cache: PaymentCache) {
  const dir = path.dirname(CACHE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, packageId, packageName, packagePrice, walletId, walletAddress } = body

    // ── Validate required fields ──────────────────────────
    const missing: string[] = []
    if (!email) missing.push('email')
    if (!name) missing.push('name')
    if (!packageId) missing.push('packageId')
    if (!packageName) missing.push('packageName')
    if (packagePrice === undefined || packagePrice === null) missing.push('packagePrice')
    if (!walletId) missing.push('walletId')
    if (!walletAddress) missing.push('walletAddress')

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 },
      )
    }

    // Validate types
    if (typeof packagePrice !== 'number' || packagePrice <= 0) {
      return NextResponse.json(
        { error: 'packagePrice must be a positive number' },
        { status: 400 },
      )
    }

    // ── Create pending booking in DB ──────────────────────
    const bookingId = createPendingBooking(
      email,
      name,
      packageId,
      packageName,
      packagePrice,
      walletId,
      walletAddress,
    )

    // ── Update payment cache ──────────────────────────────
    const cache = readCache()

    if (!cache[walletId]) {
      cache[walletId] = {
        tx_count: 0,
        last_tx: null,
        amount: null,
        checked_at: new Date().toISOString(),
        confirmed: false,
        booking_ids: [],
      }
    }

    // Append this booking's id to the tracking array
    if (!cache[walletId].booking_ids) {
      cache[walletId].booking_ids = []
    }
    cache[walletId].booking_ids.push(bookingId)
    cache[walletId].checked_at = new Date().toISOString()

    writeCache(cache)

    // ── Respond ───────────────────────────────────────────
    return NextResponse.json(
      {
        bookingId,
        address: walletAddress,
      },
      { status: 201 },
    )
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
