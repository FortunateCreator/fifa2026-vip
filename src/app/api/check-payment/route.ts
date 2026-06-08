// /api/check-payment — checks if a pending booking has been confirmed
// Supports: ?booking_id=X (client polling) | ?wallet=X&tx=1 (legacy)

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getPendingBooking } from '@/lib/db'

const CACHE_PATH = path.join(process.cwd(), 'data', 'payment-cache.json')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bookingId = searchParams.get('booking_id')
  const walletId = searchParams.get('wallet')

  // ── Primary: booking_id lookup ────────────────────────
  if (bookingId) {
    const booking = getPendingBooking(bookingId)
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check payment cache for wallet activity
    let cache: any = {}
    if (fs.existsSync(CACHE_PATH)) {
      try { cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) } catch {}
    }

    const walletData = cache[booking.wallet_id]
    const hasTx = walletData && walletData.tx_count > 0 && walletData.tx_count > (booking.tx_count_at_check || 0)

    return NextResponse.json({
      booking_id: bookingId,
      status: hasTx ? 'confirmed' : booking.status,
      confirmed: hasTx || booking.status === 'confirmed',
      wallet: booking.wallet_id,
      tx_count: walletData?.tx_count || 0,
      email: booking.email,
    })
  }

  // ── Legacy: wallet lookup ─────────────────────────────
  if (walletId) {
    let cache: any = {}
    if (fs.existsSync(CACHE_PATH)) {
      try { cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) } catch {}
    }
    const entry = cache[walletId]
    return NextResponse.json({
      wallet: walletId,
      confirmed: entry?.confirmed || false,
      tx_count: entry?.tx_count || 0,
      last_tx: entry?.last_tx || null,
      checked_at: entry?.checked_at || null,
    })
  }

  return NextResponse.json({ error: 'Missing booking_id or wallet param' }, { status: 400 })
}
