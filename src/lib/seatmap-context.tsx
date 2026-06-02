'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Seat = {
  id: string
  section: string
  row: string
  number: number
  price: number
  category: 'standard' | 'premium' | 'vip' | 'suite'
  available: boolean
  x: number
  y: number
}

type SeatMapContextType = {
  selectedSeat: Seat | null
  setSelectedSeat: (seat: Seat | null) => void
  hoveredSeat: Seat | null
  setHoveredSeat: (seat: Seat | null) => void
  stadiumName: string
  setStadiumName: (name: string) => void
}

const SeatMapContext = createContext<SeatMapContextType>({
  selectedSeat: null,
  setSelectedSeat: () => {},
  hoveredSeat: null,
  setHoveredSeat: () => {},
  stadiumName: '',
  setStadiumName: () => {},
})

export function SeatMapProvider({ children }: { children: ReactNode }) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null)
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null)
  const [stadiumName, setStadiumName] = useState('')

  return (
    <SeatMapContext.Provider value={{ selectedSeat, setSelectedSeat, hoveredSeat, setHoveredSeat, stadiumName, setStadiumName }}>
      {children}
    </SeatMapContext.Provider>
  )
}

export const useSeatMap = () => useContext(SeatMapContext)
