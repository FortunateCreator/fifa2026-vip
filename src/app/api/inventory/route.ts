import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), 'data')
const INVENTORY_FILE = join(DATA_DIR, 'inventory.json')

// Package names lookup matching data.ts
const PACKAGE_NAMES: Record<string, string> = {
  p1: 'Presidential Suite — Opening',
  p2: 'Diamond Hospitality — Opening',
  p3: 'Gold Experience — Opening',
  p4: 'Silver Seat — Opening',
  p5: 'VIP Skybox — Group Stage',
  p6: 'Premium Lounge — Group Stage',
  p7: 'Standard Entry — Group Stage',
  p8: "Chairman's Suite — R32",
  p9: 'Platinum — R32',
  p10: 'Silver — R32',
  p11: 'Diamond Suite — R16',
  p12: 'Platinum Lounge — R16',
  p13: 'Gold — R16',
  p14: 'Presidential Suite — QF',
  p15: 'Skybox Elite — QF',
  p16: 'Gold Experience — QF',
  p17: 'Silver Seat — QF',
  p18: 'Presidential Suite — Semi-Final',
  p19: 'Skybox VIP — Semi-Final',
  p20: 'Platinum — Semi-Final',
  p21: 'Gold — Semi-Final',
  p22: 'VIP Suite — Third Place',
  p23: 'Platinum — Third Place',
  p24: 'Silver Seat — Third Place',
  p25: '🐋 Crypto Whale Concierge — Final',
  p26: 'Presidential Suite — Final',
  p27: 'Platinum Skybox — Final',
  p28: 'Gold — Final',
}

// Default inventory from data.ts
const DEFAULT_INVENTORY: Record<string, number> = {
  p1: 4, p2: 8, p3: 15, p4: 30,
  p5: 6, p6: 12, p7: 50,
  p8: 4, p9: 10, p10: 20,
  p11: 4, p12: 8, p13: 15,
  p14: 2, p15: 6, p16: 10, p17: 20,
  p18: 2, p19: 6, p20: 8, p21: 15,
  p22: 4, p23: 8, p24: 25,
  p25: 1, p26: 2, p27: 4, p28: 8,
}

interface InventoryEvent {
  id: string
  packageId: string
  packageName: string
  timestamp: string
  fingerprint: string
}

interface InventoryData {
  inventory: Record<string, number>
  events: InventoryEvent[]
}

function readInventory(): InventoryData {
  if (!existsSync(INVENTORY_FILE)) {
    const initial: InventoryData = { inventory: { ...DEFAULT_INVENTORY }, events: [] }
    writeFileSync(INVENTORY_FILE, JSON.stringify(initial, null, 2))
    return initial
  }
  try {
    return JSON.parse(readFileSync(INVENTORY_FILE, 'utf-8'))
  } catch {
    const initial: InventoryData = { inventory: { ...DEFAULT_INVENTORY }, events: [] }
    writeFileSync(INVENTORY_FILE, JSON.stringify(initial, null, 2))
    return initial
  }
}

function writeInventory(data: InventoryData) {
  writeFileSync(INVENTORY_FILE, JSON.stringify(data, null, 2))
}

export async function GET() {
  const data = readInventory()
  // Return last 10 events, newest first
  const recentEvents = data.events.slice(-10).reverse()
  return NextResponse.json({ inventory: data.inventory, events: recentEvents })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packageId, fingerprint } = body

    if (!packageId) {
      return NextResponse.json({ error: 'packageId is required' }, { status: 400 })
    }

    const data = readInventory()

    // Check if package exists and has availability
    if (!(packageId in data.inventory)) {
      return NextResponse.json({ error: `Unknown package: ${packageId}` }, { status: 404 })
    }

    if (data.inventory[packageId] <= 0) {
      return NextResponse.json(
        { error: 'Package is sold out', inventory: data.inventory },
        { status: 409 }
      )
    }

    // Decrement inventory
    data.inventory[packageId] -= 1

    // Create event
    const event: InventoryEvent = {
      id: crypto.randomUUID(),
      packageId,
      packageName: PACKAGE_NAMES[packageId] || packageId,
      timestamp: new Date().toISOString(),
      fingerprint: fingerprint || 'anonymous',
    }

    data.events.push(event)

    writeInventory(data)

    return NextResponse.json({
      inventory: data.inventory,
      event,
      available: data.inventory[packageId],
    }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
