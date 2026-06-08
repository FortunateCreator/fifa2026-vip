'use client'

import { Plane, Car, Crown } from 'lucide-react'
import { Package, packageImagePath } from '@/lib/data'
import { useState, useEffect, useRef } from 'react'

export default function PackageCard({ pkg, liveAvailable }: { pkg: Package; liveAvailable?: number }) {
  const matchLabel =
    pkg.match_type === 'opening' ? '🎌 OPENING'
    : pkg.match_type === 'group' ? '⚽ GROUP STAGE'
    : pkg.match_type === 'r32' ? '🔁 ROUND OF 32'
    : pkg.match_type === 'r16' ? '🔄 ROUND OF 16'
    : pkg.match_type === 'qf' ? '⚔️ QUARTER-FINAL'
    : pkg.match_type === 'semifinal' ? '🏆 SEMI-FINAL'
    : pkg.match_type === 'third_place' ? '🥉 THIRD PLACE'
    : pkg.match_type === 'final' ? '🏆 FINAL'
    : ''

  // Use liveAvailable from API if available, otherwise fall back to static data
  const available = liveAvailable !== undefined ? liveAvailable : pkg.available

  // Pulse animation when count changes
  const [pulsing, setPulsing] = useState(false)
  const prevAvailable = useRef(available)

  useEffect(() => {
    if (prevAvailable.current !== available) {
      setPulsing(true)
      const timer = setTimeout(() => setPulsing(false), 1000)
      prevAvailable.current = available
      return () => clearTimeout(timer)
    }
  }, [available])

  return (
    <div className="group relative overflow-hidden rounded-xl border border-dark-border bg-dark-900/60 transition hover:border-gold-400/40 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]">
      {/* Package Image */}
      <div className="relative h-[180px] w-full overflow-hidden">
        <img
          src={packageImagePath(pkg)}
          alt={pkg.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />

        {/* Crypto badge */}
        {pkg.crypto_only && (
          <div className="absolute right-0 top-0 rounded-bl-lg bg-gold-400 px-3 py-1 text-xs font-bold text-black">
            CRYPTO ONLY
          </div>
        )}

        {/* Match label overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {matchLabel && (
            <span className="rounded-full bg-black/60 px-3 py-0.5 text-xs font-medium text-gold-400 backdrop-blur-sm">
              {matchLabel}
            </span>
          )}
          <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-gray-300 backdrop-blur-sm">
            {pkg.venue_name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-4">
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
          <span
            className={`text-sm transition-all duration-500 ${
              pulsing
                ? 'scale-110 text-gold-400'
                : available > 0
                  ? 'text-gray-500'
                  : 'text-red-400'
            } ${
              liveAvailable !== undefined ? 'font-semibold' : ''
            }`}
          >
            {available > 0 ? `${available} left` : 'Sold out'}
          </span>
          <a
            href={`/booking?package=${pkg.id}`}
            className="rounded-md bg-gold-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-gold-300"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
}
