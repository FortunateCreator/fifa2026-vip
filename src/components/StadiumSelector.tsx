'use client'

import { useState, useEffect } from 'react'
import { MapPin, Info, ChevronDown } from 'lucide-react'

const stadiums = [
  { name: 'AT&T Stadium', city: 'Dallas', capacity: 94000 },
  { name: 'MetLife Stadium', city: 'New York/NJ', capacity: 82500 },
  { name: 'Estadio Azteca', city: 'Mexico City', capacity: 83000 },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', capacity: 75000 },
  { name: 'SoFi Stadium', city: 'Los Angeles', capacity: 70000 },
  { name: 'Hard Rock Stadium', city: 'Miami', capacity: 65000 },
]

interface PackageProp {
  id: string
  name: string
  venue_name: string
  match_type: string
  seats?: string
}

interface StadiumSelectorProps {
  pkg?: PackageProp | null
  onBook?: (sectionId: string) => void
}

/** Map package seat fields to stadium SVG section IDs */
function mapSeatsToSection(seats: string): string {
  const map: Record<string, string> = {
    'Presidential Suite': 'vip-suite',
    'VIP Suite': 'vip-suite',
    'Diamond Suite': 'vip-suite',
    'Category 1': 'cat1',
    'Skybox Suite': 'cat1',
    "Chairman's Suite": 'cat1',
    'Premium': 'cat1',
    'Category 2': 'cat2',
    'Standard': 'standard',
  }
  return map[seats] || 'cat1'
}

/** Friendly label for each section */
const sectionLabels: Record<string, string> = {
  'vip-suite': 'VIP Suite',
  'cat1': 'Category 1',
  'cat2': 'Category 2',
  'standard': 'Standard',
}

export default function StadiumSelector({ pkg, onBook }: StadiumSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [currentStadium, setCurrentStadium] = useState(stadiums[0])
  const [booked, setBooked] = useState(false)

  const sections = [
    { id: 'vip-suite', label: 'VIP Suites', color: '#d4a853', price: 250000, seats: 120, cx: 50, cy: 32 },
    { id: 'cat1', label: 'Category 1', color: '#22c55e', price: 85000, seats: 480, cx: 50, cy: 45 },
    { id: 'cat2', label: 'Category 2', color: '#3b82f6', price: 35000, seats: 1200, cx: 50, cy: 58 },
    { id: 'standard', label: 'Standard', color: '#6b7280', price: 15000, seats: 2400, cx: 50, cy: 72 },
  ]

  const isPackageLocked = !!pkg

  // Auto-select stadium from package venue
  useEffect(() => {
    if (pkg?.venue_name) {
      const match = stadiums.find(
        (s) => s.name.toLowerCase() === pkg.venue_name.toLowerCase()
      )
      if (match) {
        setCurrentStadium(match)
      }
    }
  }, [pkg])

  // Auto-highlight the section matching the package's seat tier
  useEffect(() => {
    if (pkg?.seats) {
      const mappedId = mapSeatsToSection(pkg.seats)
      setSelected(mappedId)
    }
  }, [pkg])

  const handleBook = () => {
    if (selected) {
      setBooked(true)
      if (onBook) {
        onBook(selected)
      } else {
        // Direct scroll fallback if no callback
        const el = document.getElementById('payment-section')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  const selectedSection = sections.find((s) => s.id === selected)

  return (
    <div className="mx-auto max-w-4xl">
      {/* Package venue info banner */}
      {pkg && (
        <div className="mb-4 rounded-lg border border-gold-400/20 bg-gold-400/5 px-4 py-3 text-sm text-gray-300">
          <span className="text-gold-400">📍</span> Your package includes seats at{' '}
          <span className="font-semibold text-white">{pkg.venue_name}</span>
          {pkg.seats && (
            <>
              {' · '}
              <span className="text-gold-400">{sectionLabels[mapSeatsToSection(pkg.seats)] || pkg.seats}</span> seating
            </>
          )}
        </div>
      )}

      {/* Booked confirmation */}
      {booked && (
        <div className="mb-4 rounded-lg border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300">
          ✓ You've selected <span className="font-semibold text-white">{selectedSection?.label}</span> seats at{' '}
          <span className="font-semibold text-white">{currentStadium.name}</span>. Scroll down to complete your booking.
        </div>
      )}

      {/* Stadium selector dropdown */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-gray-400">
          {isPackageLocked ? 'Venue' : 'Select Stadium'}
        </label>
        <div className="relative">
          <select
            className="w-full appearance-none rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 pr-10 text-white outline-none focus:border-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            value={currentStadium.name}
            disabled={isPackageLocked}
            onChange={(e) => {
              const s = stadiums.find((st) => st.name === e.target.value) || stadiums[0]
              setCurrentStadium(s)
              setSelected(null)
              setBooked(false)
            }}
          >
            {stadiums.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name} — {s.city}
              </option>
            ))}
          </select>
          {isPackageLocked && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3m0 0l3-3m-3 3h6" />
              </svg>
            </div>
          )}
        </div>
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
                onClick={() => {
                  setSelected(isActive ? null : s.id)
                  setBooked(false)
                }}
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

        {/* Selection info with Book button */}
        {selected && (
          <div className="mt-4 rounded-lg border border-gold-400/30 bg-gold-400/5 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-gold-400">
                  {selectedSection?.label}
                </span>
                <span className="ml-3 text-sm text-gray-400">
                  Starting from ${selectedSection?.price.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-sm text-gray-500 hover:text-gray-300"
              >
                Clear
              </button>
            </div>
            {/* Book Selected Seats button */}
            <button
              id="book-seats-btn"
              onClick={handleBook}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold-300"
            >
              Book Selected Seats
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
