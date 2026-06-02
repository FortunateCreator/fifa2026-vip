'use client'

import { Plane, Car, Crown } from 'lucide-react'
import { Package } from '@/lib/data'

export default function PackageCard({ pkg }: { pkg: Package }) {
  const matchLabel =
    pkg.match_type === 'final' ? '🏆 FINAL'
    : pkg.match_type === 'opening' ? '🎌 OPENING'
    : pkg.match_type === 'semifinal' ? '⚔️ SEMI-FINAL'
    : ''

  return (
    <div className="group relative overflow-hidden rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/40 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]">
      {pkg.crypto_only && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-gold-400 px-3 py-1 text-xs font-bold text-black">
          CRYPTO ONLY
        </div>
      )}
      <div className="mb-3 flex items-center gap-2">
        {matchLabel && (
          <span className="rounded-full bg-gold-400/10 px-3 py-0.5 text-xs font-medium text-gold-400">
            {matchLabel}
          </span>
        )}
        <span className="text-xs text-gray-500">{pkg.venue_name} · {pkg.match_date}</span>
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{pkg.name}</h3>
      <p className="mb-4 text-sm leading-relaxed text-gray-400">{pkg.description}</p>
      <div className="mb-4 flex items-center gap-4">
        {pkg.includes_jet && <Plane className="h-4 w-4 text-gold-400" aria-label="Private Jet" />}
        {pkg.includes_rolls_royce && <Car className="h-4 w-4 text-gold-400" aria-label="Rolls Royce" />}
        {pkg.includes_hospitality && <Crown className="h-4 w-4 text-gold-400" aria-label="VIP Hospitality" />}
      </div>
      <div className="mb-4">
        <span className="text-2xl font-bold text-white">${pkg.price_usd.toLocaleString()}</span>
        <span className="ml-2 text-xs text-gray-500">/ person</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {pkg.available > 0 ? `${pkg.available} left` : 'Sold out'}
        </span>
        <a
          href={`/booking?package=${pkg.id}`}
          className="rounded-md bg-gold-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-gold-300"
        >
          Book Now
        </a>
      </div>
    </div>
  )
}
