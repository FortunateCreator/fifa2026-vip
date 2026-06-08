'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import Link from 'next/link'
import type { Package } from '@/lib/data'
import StadiumSelector from '@/components/StadiumSelector'
import CryptoPaymentFlow from '@/components/CryptoPaymentFlow'

function getRandomBookers() {
  return Math.floor(Math.random() * (24 - 8 + 1)) + 8
}


const sectionLabels: Record<string, string> = {
  'vip-suite': 'VIP Suite',
  'cat1': 'Category 1',
  'cat2': 'Category 2',
  'standard': 'Standard',
}

function CountdownTimer({ deadline }: { deadline: Date }) {
  const [seconds, setSeconds] = useState(Math.floor((deadline.getTime() - Date.now()) / 1000))

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Math.floor((deadline.getTime() - Date.now()) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [deadline])

  if (seconds <= 0) {
    return (
      <p className="text-amber-400">
        This tier has closed.{' '}
        <Link href="/tickets" className="underline hover:text-gold-400">
          View remaining packages →
        </Link>
      </p>
    )
  }

  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return (
    <span className="font-mono text-amber-400">
      {d}d {h}h {m}m {s}s remaining
    </span>
  )
}

export default function BookingClient({ initialPkg: _initialPkg }: { initialPkg: Package | null }) {
  const [pkg, setPkg] = useState<Package | null>(_initialPkg)
  const [liveBookers, setLiveBookers] = useState(0)
  const [selectedSeatSection, setSelectedSeatSection] = useState<string | null>(null)
  const paymentRef = useRef<HTMLDivElement>(null)
  const selectedSeatRef = useRef<string | null>(null)

  // Live social proof counter — refresh every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookers(getRandomBookers())
    }, 45000)
    return () => clearInterval(interval)
  }, [])

  const deadline = useMemo(() => pkg && pkg.match_date ? new Date(pkg.match_date + "T23:59:00") : null, [pkg?.match_date])

  const handleBook = useCallback((sectionId: string) => {
    setSelectedSeatSection(sectionId)
    selectedSeatRef.current = sectionId
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">
          {pkg ? (
            <>Your <span className="text-gold-400">{pkg.name}</span></>
          ) : (
            <>Book Your <span className="text-gold-400">VIP Experience</span></>
          )}
        </h1>
        <p className="mt-2 text-gray-400">
          {pkg ? 'Your concierge is standing by' : 'Select your package, choose your seats, and submit your enquiry'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          {pkg && (
            <>
              <div className="rounded-xl border border-gold-400/30 bg-dark-900/60 p-6">
                <div className="mb-2 text-sm uppercase tracking-wider text-gold-400">
                  {pkg.match_type.toUpperCase()} PACKAGE
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">{pkg.name}</h2>

                {/* Live social proof counter */}
                <div className="mb-4 flex items-center gap-2 text-sm text-amber-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  🔴 {liveBookers} people are booking this right now
                </div>

                <p className="mb-4 text-gray-400">{pkg.description}</p>
                <div className="mb-2 text-sm text-gray-500">{pkg.venue_name} · {pkg.match_date}</div>
                <div className="text-3xl font-bold text-white">${pkg.price_usd.toLocaleString()}</div>

                <p className="mt-4 text-sm text-gray-300">
                  Your suite awaits — complete your booking below.
                </p>
              </div>

              {/* Urgency Countdown */}
              {deadline && (
                <div className="rounded-xl border border-gold-400/50 bg-dark-900/80 p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⏰</span>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400">
                        Limited Availability
                      </h4>
                      <p className="mt-1 text-lg font-bold text-white">{pkg.name}</p>
                      <p className="mt-2">
                        <CountdownTimer deadline={deadline} />
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        Only {pkg.available} package{pkg.available !== 1 ? 's' : ''} left at this tier
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {!pkg && (
            <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6 text-center text-gray-500">
              Select a package from the Tickets page to see details here.
            </div>
          )}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              {pkg ? 'Your Seat Selection' : 'Interactive Seat Selection'}
            </h3>
            <StadiumSelector pkg={pkg} onBook={handleBook} />
          </div>
        </div>
        <div className="space-y-6 lg:col-span-2">
          {pkg ? (
            <>
              <h3 className="text-lg font-semibold text-white">Secure your reservation</h3>

              {/* Seat selection confirmation */}
              {selectedSeatSection && (
                <div className="rounded-lg border border-gold-400/20 bg-gold-400/5 px-4 py-3 text-sm text-gray-300">
                  <span className="text-gold-400">✓</span> You've selected:{' '}
                  <span className="font-semibold text-white">
                    {sectionLabels[selectedSeatSection] || selectedSeatSection}
                  </span>{' '}
                  seats at{' '}
                  <span className="font-semibold text-white">{pkg.venue_name}</span>
                </div>
              )}

              {/* Payment section — scroll target */}
              <div ref={paymentRef} id="payment-section">
                <CryptoPaymentFlow pkg={pkg} />
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6 text-center text-gray-500">
              Select a package to see Bitcoin payment options.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
