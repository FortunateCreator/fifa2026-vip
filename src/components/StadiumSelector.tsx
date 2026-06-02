'use client'

import { useState } from 'react'
import { MapPin, Info } from 'lucide-react'

const stadiums = [
  { name: 'AT&T Stadium', city: 'Dallas', capacity: 94000 },
  { name: 'MetLife Stadium', city: 'New York/NJ', capacity: 82500 },
  { name: 'Estadio Azteca', city: 'Mexico City', capacity: 83000 },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', capacity: 75000 },
  { name: 'SoFi Stadium', city: 'Los Angeles', capacity: 70000 },
  { name: 'Hard Rock Stadium', city: 'Miami', capacity: 65000 },
]

export default function StadiumSelector() {
  const [selected, setSelected] = useState<string | null>(null)
  const [currentStadium, setCurrentStadium] = useState(stadiums[0])

  const sections = [
    { id: 'vip-suite', label: 'VIP Suites', color: '#d4a853', price: 250000, seats: 120, cx: 50, cy: 32 },
    { id: 'cat1', label: 'Category 1', color: '#22c55e', price: 85000, seats: 480, cx: 50, cy: 45 },
    { id: 'cat2', label: 'Category 2', color: '#3b82f6', price: 35000, seats: 1200, cx: 50, cy: 58 },
    { id: 'standard', label: 'Standard', color: '#6b7280', price: 15000, seats: 2400, cx: 50, cy: 72 },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      {/* Stadium selector dropdown */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-gray-400">Select Stadium</label>
        <select
          className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400"
          value={currentStadium.name}
          onChange={(e) => {
            const s = stadiums.find((st) => st.name === e.target.value) || stadiums[0]
            setCurrentStadium(s)
            setSelected(null)
          }}
        >
          {stadiums.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} — {s.city}
            </option>
          ))}
        </select>
      </div>

      {/* Info bar */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-dark-800/60 px-4 py-2 text-sm text-gray-400">
        <MapPin className="h-4 w-4 text-gold-400" />
        {currentStadium.name}, {currentStadium.city} — {currentStadium.capacity.toLocaleString()} seats
      </div>

      {/* Interactive SVG Stadium */}
      <div className="relative rounded-xl border border-dark-border bg-dark-900/60 p-4">
        <svg viewBox="0 0 100 100" className="w-full">
          {/* Outer oval (stadium shape) */}
          <ellipse cx="50" cy="50" rx="45" ry="42" fill="none" stroke="#2a2a3a" strokeWidth="0.5" />

          {/* Playing field */}
          <rect x="25" y="35" width="50" height="30" rx="4" fill="#1a3a1a" stroke="#2a5a2a" strokeWidth="0.3" />
          <line x1="50" y1="35" x2="50" y2="65" stroke="#2a5a2a" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="3" fill="none" stroke="#2a5a2a" strokeWidth="0.2" />

          {/* Section rings */}
          {sections.map((s) => {
            const isActive = selected === s.id
            const rx = s.cx === 50 ? 45 - (s.cx - 45) * 2.5 : 45 - (50 - s.cx) * 2.5
            const ry = s.cx === 50 ? 42 - (s.cy - 32) * 1.2 : 42 - (50 - s.cy) * 1.2
            const rInner = rx - 4
            return (
              <g
                key={s.id}
                className="cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => setSelected(isActive ? null : s.id)}
              >
                {/* Section band */}
                <ellipse
                  cx="50"
                  cy={s.cy}
                  rx={rx - (sections.indexOf(s) * 2)}
                  ry={ry - (sections.indexOf(s) * 4)}
                  fill={s.color}
                  fillOpacity={isActive ? 0.3 : 0.12}
                  stroke={isActive ? s.color : `${s.color}60`}
                  strokeWidth={isActive ? 1 : 0.4}
                />
                {/* Label */}
                <text
                  x={50}
                  y={s.cy + 0.5}
                  textAnchor="middle"
                  fill={isActive ? s.color : '#9ca3af'}
                  fontSize="2.5"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  className="pointer-events-none"
                >
                  {s.label}
                </text>
                {/* Seat dots for VIP section */}
                {s.id === 'vip-suite' && (
                  <>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={35 + i * 6}
                        cy={29}
                        r="0.6"
                        fill={s.color}
                        opacity={selected === s.id ? 1 : 0.5}
                      />
                    ))}
                  </>
                )}
              </g>
            )
          })}
        </svg>

        {/* Selection info */}
        {selected && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-gold-400/30 bg-gold-400/5 px-4 py-3">
            <div>
              <span className="font-semibold text-gold-400">
                {sections.find((s) => s.id === selected)?.label}
              </span>
              <span className="ml-3 text-sm text-gray-400">
                Starting from ${sections.find((s) => s.id === selected)?.price.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-sm text-gray-500 hover:text-gray-300"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4">
        {sections.map((s) => (
          <div key={s.id} className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: s.color, opacity: 0.5 }} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}
