'use client'

import { packages } from '@/lib/data'
import PackageCard from './PackageCard'
import { useState } from 'react'

export default function PackageGrid() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? packages : packages.filter((p) => p.match_type === filter)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            VIP <span className="text-gold-400">Hospitality Packages</span>
          </h2>
          <p className="mt-2 text-gray-400">Curated for the world&apos;s most discerning clientele</p>
        </div>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {['all', 'opening', 'semifinal', 'final'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === f
                  ? 'bg-gold-400 font-bold text-black'
                  : 'border border-dark-border text-gray-400 hover:border-gold-400/50 hover:text-gold-400'
              }`}
            >
              {f === 'all' ? 'All Matches' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
