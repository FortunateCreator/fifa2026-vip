'use client'

import { useEffect, useState } from 'react'

interface InventoryEvent {
  id: string
  packageId: string
  packageName: string
  timestamp: string
  fingerprint: string
}

export default function ActivityTicker() {
  const [events, setEvents] = useState<InventoryEvent[]>([])
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  // Fetch events from the API — used by both ticker display and simulation
  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/inventory')
      const data = await res.json()
      setEvents(data.events || [])
    } catch {
      // silent
    }
  }

  // Track simulations per visitor — max 2 per session
  const SIMULATION_KEY = 'v26_ticker_count'
  const MAX_SIMULATIONS = 2

  const canSimulate = (): number => {
    if (typeof window === 'undefined') return 0
    const count = parseInt(sessionStorage.getItem(SIMULATION_KEY) || '0', 10)
    return MAX_SIMULATIONS - count
  }

  const incrementSimulation = () => {
    if (typeof window === 'undefined') return
    const count = parseInt(sessionStorage.getItem(SIMULATION_KEY) || '0', 10)
    sessionStorage.setItem(SIMULATION_KEY, String(count + 1))
  }

  // Simulate a random purchase (only if under cap)
  const simulatePurchase = async () => {
    if (canSimulate() <= 0) return

    // Get the fingerprint from sessionStorage
    const fp = typeof window !== 'undefined'
      ? sessionStorage.getItem('v26_fp') || 'anonymous'
      : 'anonymous'

    try {
      // First fetch current inventory to find available packages
      const res = await fetch('/api/inventory')
      const data = await res.json()
      const inventory = data.inventory || {}

      // Find packages with available > 0
      const available = Object.entries(inventory)
        .filter(([, count]) => (count as number) > 0)
        .map(([id]) => id)

      if (available.length === 0) return // everything is sold out

      // Pick a random available package
      const randomId = available[Math.floor(Math.random() * available.length)]

      // Post the purchase
      await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: randomId, fingerprint: fp }),
      })

      // Increment counter and refresh events
      incrementSimulation()
      await fetchEvents()
    } catch {
      // silent
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchEvents()

    // Run simulations with a small delay between them for natural pacing
    const runSimulations = async () => {
      const remaining = canSimulate()
      for (let i = 0; i < remaining; i++) {
        await new Promise((r) => setTimeout(r, 4000 + Math.random() * 6000)) // 4-10s apart
        await simulatePurchase()
      }
    }

    runSimulations()

    // Refresh events display periodically to keep the ticker cycling
    const refreshInterval = setInterval(fetchEvents, 20000)

    // Keep cycling through events even after simulations stop
    return () => {
      clearInterval(refreshInterval)
    }
  }, [])

  // Cycle through events every 8 seconds
  useEffect(() => {
    if (events.length === 0) return

    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % events.length)
        setVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [events.length])

  const formatEvent = (ev: InventoryEvent): string => {
    const emojis = ['🔔', '🌟', '✨', '💎', '⭐', '🔥', '💫', '👑']
    const emoji = emojis[Math.floor(Math.random() * emojis.length)] // stable-ish per render
    return `${emoji} Someone just booked ${ev.packageName}`
  }

  const defaultMessage = '💎 Live booking activity will appear here'

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm" aria-live="polite">
      <div
        className={`transform rounded-xl border border-dark-border/60 bg-dark-900/80 px-5 py-3 shadow-lg backdrop-blur-xl transition-all duration-500 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-4 opacity-0'
        }`}
        style={{ borderColor: 'rgba(212,168,83,0.2)' }}
      >
        <div className="flex items-center gap-3">
          {/* Live dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <p className="text-sm text-gray-200">
            {events.length > 0 ? formatEvent(events[index]) : defaultMessage}
          </p>
        </div>
      </div>
    </div>
  )
}
