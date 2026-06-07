'use client'

import { packages } from '@/lib/data'
import PackageCard from './PackageCard'
import { useState, useEffect } from 'react'

interface InventoryMap {
  [packageId: string]: number
}

export default function PackageGrid() {
  const [filter, setFilter] = useState('all')
  const [liveInventory, setLiveInventory] = useState<InventoryMap | null>(null)

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory')
      const data = await res.json()
      if (data.inventory) {
        setLiveInventory(data.inventory)
      }
    } catch {
      // fall back to static data.ts values
    }
  }

  useEffect(() => {
    fetchInventory()
    // Re-fetch every 30 seconds
    const interval = setInterval(fetchInventory, 30000)
    return () => clearInterval(interval)
  }, [])

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
          {[
            { key: 'all', label: 'All Matches' },
            { key: 'opening', label: 'Opening' },
            { key: 'group', label: 'Group Stage' },
            { key: 'r32', label: 'Round of 32' },
            { key: 'r16', label: 'Round of 16' },
            { key: 'qf', label: 'Quarter-Final' },
            { key: 'semifinal', label: 'Semi-Final' },
            { key: 'third_place', label: 'Third Place' },
            { key: 'final', label: 'Final' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                filter === key
                  ? 'bg-gold-400 font-bold text-black'
                  : 'border border-dark-border text-gray-400 hover:border-gold-400/50 hover:text-gold-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PackageCard
              key={p.id}
              pkg={p}
              liveAvailable={liveInventory ? liveInventory[p.id] : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
