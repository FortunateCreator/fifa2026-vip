'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plane, Car, Crown, ArrowRight } from 'lucide-react'

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    function tick() {
      const diff = new Date('2026-06-11T00:00:00').getTime() - Date.now()
      if (diff <= 0) return
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,168,83,0.15),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1 text-sm text-gold-400">
          <Crown className="h-4 w-4" /> World Cup 2026 — Limited Availability
        </div>
        <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-7xl">
          The Ultimate{' '}
          <span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">
            FIFA 2026
          </span>{' '}
          VIP Experience
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
          Private jet charters · Rolls Royce transfers · Presidential suites · 
          White-glove crypto concierge for HNWI clients worldwide
        </p>
        <div className="mb-10 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="text-gold-400">Tournament starts in</span>
        </div>
        <div className="mb-10 flex items-center justify-center gap-6">
          {[
            { v: timeLeft.d, l: 'Days' },
            { v: timeLeft.h, l: 'Hours' },
            { v: timeLeft.m, l: 'Minutes' },
            { v: timeLeft.s, l: 'Seconds' },
          ].map((x) => (
            <div key={x.l} className="text-center">
              <div className="min-w-[60px] rounded-lg border border-dark-border bg-dark-800/80 px-4 py-2 text-3xl font-bold text-gold-400">
                {String(x.v).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs text-gray-500">{x.l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/tickets"
            className="flex items-center gap-2 rounded-lg bg-gold-400 px-8 py-3 text-base font-bold text-black transition hover:bg-gold-300"
          >
            View Packages <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/booking"
            className="flex items-center gap-2 rounded-lg border border-gold-400/50 px-8 py-3 text-base font-semibold text-gold-400 transition hover:bg-gold-400/10"
          >
            Book VIP Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
