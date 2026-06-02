// FIFA 2026 VIP Site — Static data (no database dependency)
// All data is served from these JSON files for zero-infrastructure operation.

export const venues = [
  { id: '1', name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: 94000 },
  { id: '2', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 83000 },
  { id: '3', name: 'MetLife Stadium', city: 'New York/NJ', country: 'USA', capacity: 82500 },
  { id: '4', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 75000 },
  { id: '5', name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: 70000 },
  { id: '6', name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: 65000 },
  { id: '7', name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54000 },
  { id: '8', name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45000 },
]

export const matches = [
  { id: 'm1', venue_id: '2', match_type: 'opening', match_date: '2026-06-11', description: 'Opening Match — Mexico', venue_name: 'Estadio Azteca' },
  { id: 'm2', venue_id: '3', match_type: 'final', match_date: '2026-07-19', description: 'World Cup Final 2026', venue_name: 'MetLife Stadium' },
  { id: 'm3', venue_id: '1', match_type: 'semifinal', match_date: '2026-07-14', description: 'Semi-Final 1', venue_name: 'AT&T Stadium' },
  { id: 'm4', venue_id: '4', match_type: 'semifinal', match_date: '2026-07-15', description: 'Semi-Final 2', venue_name: 'Mercedes-Benz Stadium' },
]

export const packages = [
  {
    id: 'p1',
    name: 'Presidential Suite — Final',
    match_id: 'm2',
    match_type: 'final',
    match_date: '2026-07-19',
    venue_name: 'MetLife Stadium',
    description: 'Ultimate VIP: Presidential suite at MetLife Stadium, private Gulfstream jet transfer, Rolls Royce Phantom pickup/dropoff, personal concierge, gourmet catering, champagne bar.',
    price_usd: 250000,
    includes_jet: true,
    includes_rolls_royce: true,
    includes_hospitality: true,
    seats: 'Presidential Suite',
    available: 2,
    crypto_only: false,
  },
  {
    id: 'p2',
    name: 'Skybox VIP — Semi-Final',
    match_id: 'm3',
    match_type: 'semifinal',
    match_date: '2026-07-14',
    venue_name: 'AT&T Stadium',
    description: 'Premium skybox suite with dedicated catering, private bar, VIP parking, and personal host. Optional private jet addon available.',
    price_usd: 85000,
    includes_jet: false,
    includes_rolls_royce: false,
    includes_hospitality: true,
    seats: 'Skybox Suite',
    available: 4,
    crypto_only: false,
  },
  {
    id: 'p3',
    name: 'Rolls Royce Platinum — Opening',
    match_id: 'm1',
    match_type: 'opening',
    match_date: '2026-06-11',
    venue_name: 'Estadio Azteca',
    description: 'Rolls Royce Phantom pickup from any Mexico City hotel, Category 1 seats, pre-match hospitality lounge with champagne service, dedicated driver for the day.',
    price_usd: 45000,
    includes_jet: false,
    includes_rolls_royce: true,
    includes_hospitality: true,
    seats: 'Category 1',
    available: 4,
    crypto_only: false,
  },
  {
    id: 'p4',
    name: '🐋 Crypto Whale Concierge — Final',
    match_id: 'm2',
    match_type: 'final',
    match_date: '2026-07-19',
    venue_name: 'MetLife Stadium',
    description: 'The ultimate: Gulfstream G650 private jet, Rolls Royce fleet (Phantom + Cullinan), penthouse suite, personal butler, private chef, best seats in the house. BTC/ETH only. Discreet, no KYC.',
    price_usd: 500000,
    includes_jet: true,
    includes_rolls_royce: true,
    includes_hospitality: true,
    seats: 'Presidential Suite',
    available: 1,
    crypto_only: true,
  },
]

export type Venue = typeof venues[0]
export type Match = typeof matches[0]
export type Package = typeof packages[0]
