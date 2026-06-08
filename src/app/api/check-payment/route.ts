// /api/check-payment — lightweight cache-based verification
// The cron job updates data/payment-cache.json every 10 min.
// This endpoint reads from cache — no external API calls at request time.

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface PaymentCache {
  [walletId: string]: {
    tx_count: number
    last_tx: string | null
    amount: number | null
    checked_at: string
    confirmed: boolean
  }
}

const CACHE_PATH = path.join(process.cwd(), 'data', 'payment-cache.json')

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const walletId = searchParams.get('wallet')
  const txParam = searchParams.get('tx') // presence = check for new tx

  if (!walletId) {
    return NextResponse.json({ error: 'Missing wallet param' }, { status: 400 })
  }

  try {
    let cache: PaymentCache = {}
    if (fs.existsSync(CACHE_PATH)) {
      const raw = fs.readFileSync(CACHE_PATH, 'utf-8')
      cache = JSON.parse(raw)
    }

    const entry = cache[walletId]
    if (!entry) {
      return NextResponse.json({
        wallet: walletId,
        confirmed: false,
        tx_count: 0,
        last_tx: null,
        checked_at: null,
      })
    }

    // If tx param is set, the client wants to know if there's NEW activity
    if (txParam !== null) {
      return NextResponse.json({
        wallet: walletId,
        confirmed: entry.confirmed,
        tx_count: entry.tx_count,
        last_tx: entry.last_tx,
        amount: entry.amount,
        checked_at: entry.checked_at,
        // Mark confirmed if we've seen at least one tx
        first_tx: entry.tx_count > 0,
      })
    }

    // Just return cache state
    return NextResponse.json(entry)
  } catch {
    return NextResponse.json({ error: 'Cache read failed' }, { status: 500 })
  }
}
