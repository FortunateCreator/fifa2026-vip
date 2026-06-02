'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { packages } from '@/lib/data'
import StadiumSelector from '@/components/StadiumSelector'
import ContactForm from '@/components/ContactForm'
import { Bitcoin, Shield, Lock } from 'lucide-react'

function BookingContent() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('package')
  const [pkg, setPkg] = useState<typeof packages[0] | null>(null)

  useEffect(() => {
    if (packageId) {
      const found = packages.find((p) => p.id === packageId)
      setPkg(found || null)
    }
  }, [packageId])

  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white">
          Book Your <span className="text-gold-400">VIP Experience</span>
        </h1>
        <p className="mt-2 text-gray-400">Select your package, choose your seats, and submit your enquiry</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          {pkg && (
            <div className="rounded-xl border border-gold-400/30 bg-dark-900/60 p-6">
              <div className="mb-2 text-sm uppercase tracking-wider text-gold-400">
                {pkg.match_type.toUpperCase()} PACKAGE
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">{pkg.name}</h2>
              <p className="mb-4 text-gray-400">{pkg.description}</p>
              <div className="mb-2 text-sm text-gray-500">{pkg.venue_name} · {pkg.match_date}</div>
              <div className="text-3xl font-bold text-white">${pkg.price_usd.toLocaleString()}</div>
            </div>
          )}
          {!pkg && (
            <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6 text-center text-gray-500">
              Select a package from the Tickets page to see details here.
            </div>
          )}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Interactive Seat Selection</h3>
            <StadiumSelector />
          </div>
        </div>
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Your Details</h3>
            <ContactForm />
          </div>
          <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Bitcoin className="h-5 w-5 text-gold-400" /> Crypto Payment
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> BTC, ETH, USDT (ERC-20/TRC-20) accepted</li>
              <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> Discreet OTC desk for large transactions</li>
              <li className="flex items-start gap-2"><Lock className="mt-0.5 h-4 w-4 text-green-400" /> Encrypted communication via Signal/Wickr</li>
              <li className="flex items-start gap-2"><Lock className="mt-0.5 h-4 w-4 text-green-400" /> No KYC required for crypto whale packages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <div className="min-h-screen py-20">
      <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading...</div>}>
        <BookingContent />
      </Suspense>
    </div>
  )
}
