// FIFA 2026 VIP Site — Static data (no database dependency)
// All data is served from these JSON files for zero-infrastructure operation.

export const venues = [
  // USA (11)
  { id: '1', name: 'AT&T Stadium', city: 'Arlington', country: 'USA', capacity: 94000 },
  { id: '2', name: 'MetLife Stadium', city: 'East Rutherford', country: 'USA', capacity: 82500 },
  { id: '3', name: 'SoFi Stadium', city: 'Inglewood', country: 'USA', capacity: 70000 },
  { id: '4', name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 71000 },
  { id: '5', name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: 72000 },
  { id: '6', name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: 76000 },
  { id: '7', name: 'Hard Rock Stadium', city: 'Miami Gardens', country: 'USA', capacity: 65000 },
  { id: '8', name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: 69000 },
  { id: '9', name: "Levi's Stadium", city: 'Santa Clara', country: 'USA', capacity: 68500 },
  { id: '10', name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: 69000 },
  { id: '11', name: 'Gillette Stadium', city: 'Foxborough', country: 'USA', capacity: 65000 },
  // Mexico (3)
  { id: '12', name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 83000 },
  { id: '13', name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 51000 },
  { id: '14', name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 46000 },
  // Canada (2)
  { id: '15', name: 'BC Place', city: 'Vancouver', country: 'Canada', capacity: 54500 },
  { id: '16', name: 'BMO Field', city: 'Toronto', country: 'Canada', capacity: 45500 },
]

export const groups = [
  {
    id: 'A', teams: ['Czech Republic', 'Mexico', 'South Africa', 'South Korea'],
    venues: ['Estadio Azteca', 'Estadio BBVA', 'Estadio Akron'],
  },
  {
    id: 'B', teams: ['Bosnia and Herzegovina', 'Canada', 'Qatar', 'Switzerland'],
    venues: ['BC Place', 'BMO Field', 'Lumen Field'],
  },
  {
    id: 'C', teams: ['Brazil', 'Haiti', 'Morocco', 'Scotland'],
    venues: ['SoFi Stadium', 'Levi\'s Stadium', 'NRG Stadium'],
  },
  {
    id: 'D', teams: ['Australia', 'Paraguay', 'Turkey', 'United States'],
    venues: ['AT&T Stadium', 'NRG Stadium', 'Arrowhead Stadium'],
  },
  {
    id: 'E', teams: ['Curaçao', 'Ecuador', 'Germany', 'Ivory Coast'],
    venues: ['Lincoln Financial Field', 'Gillette Stadium', 'Mercedes-Benz Stadium'],
  },
  {
    id: 'F', teams: ['Japan', 'Netherlands', 'Sweden', 'Tunisia'],
    venues: ['Hard Rock Stadium', 'Mercedes-Benz Stadium', 'NRG Stadium'],
  },
  {
    id: 'G', teams: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
    venues: ['Lumen Field', 'Levi\'s Stadium', 'SoFi Stadium'],
  },
  {
    id: 'H', teams: ['Cape Verde', 'Saudi Arabia', 'Spain', 'Uruguay'],
    venues: ['BC Place', 'BMO Field', 'Lumen Field'],
  },
  {
    id: 'I', teams: ['France', 'Iraq', 'Norway', 'Senegal'],
    venues: ['AT&T Stadium', 'Arrowhead Stadium', 'NRG Stadium'],
  },
  {
    id: 'J', teams: ['Algeria', 'Argentina', 'Austria', 'Jordan'],
    venues: ['MetLife Stadium', 'Lincoln Financial Field', 'Gillette Stadium'],
  },
  {
    id: 'K', teams: ['Colombia', 'DR Congo', 'Portugal', 'Uzbekistan'],
    venues: ['Hard Rock Stadium', 'Mercedes-Benz Stadium', 'Estadio BBVA'],
  },
  {
    id: 'L', teams: ['Croatia', 'England', 'Ghana', 'Panama'],
    venues: ['SoFi Stadium', 'Levi\'s Stadium', 'Estadio Akron'],
  },
]

export const matches = [
  // Opening Match — June 11
  { id: 'm1', venue_id: '12', match_type: 'opening', match_date: '2026-06-11', description: 'Opening Match — Mexico vs South Africa', venue_name: 'Estadio Azteca' },
  // Group Stage matches at key venues (June 11-27)
  { id: 'm5', venue_id: '12', match_type: 'group', match_date: '2026-06-11', description: 'Group A — Czech Republic vs South Korea', venue_name: 'Estadio Azteca' },
  { id: 'm6', venue_id: '12', match_type: 'group', match_date: '2026-06-12', description: 'Group A — Mexico vs South Africa', venue_name: 'Estadio Azteca' },
  { id: 'm7', venue_id: '12', match_type: 'group', match_date: '2026-06-14', description: 'Group A — Mexico vs Czech Republic', venue_name: 'Estadio Azteca' },
  { id: 'm8', venue_id: '12', match_type: 'group', match_date: '2026-06-17', description: 'Group A — South Africa vs South Korea', venue_name: 'Estadio Azteca' },
  { id: 'm9', venue_id: '1', match_type: 'group', match_date: '2026-06-12', description: 'Group D — United States vs Australia', venue_name: 'AT&T Stadium' },
  { id: 'm10', venue_id: '1', match_type: 'group', match_date: '2026-06-15', description: 'Group D — Turkey vs Paraguay', venue_name: 'AT&T Stadium' },
  { id: 'm11', venue_id: '1', match_type: 'group', match_date: '2026-06-18', description: 'Group I — France vs Senegal', venue_name: 'AT&T Stadium' },
  { id: 'm12', venue_id: '1', match_type: 'group', match_date: '2026-06-21', description: 'Group D — United States vs Turkey', venue_name: 'AT&T Stadium' },
  { id: 'm13', venue_id: '2', match_type: 'group', match_date: '2026-06-13', description: 'Group J — Argentina vs Algeria', venue_name: 'MetLife Stadium' },
  { id: 'm14', venue_id: '2', match_type: 'group', match_date: '2026-06-16', description: 'Group J — Austria vs Jordan', venue_name: 'MetLife Stadium' },
  { id: 'm15', venue_id: '2', match_type: 'group', match_date: '2026-06-19', description: 'Group J — Argentina vs Austria', venue_name: 'MetLife Stadium' },
  { id: 'm16', venue_id: '3', match_type: 'group', match_date: '2026-06-12', description: 'Group C — Brazil vs Scotland', venue_name: 'SoFi Stadium' },
  { id: 'm17', venue_id: '3', match_type: 'group', match_date: '2026-06-15', description: 'Group C — Morocco vs Haiti', venue_name: 'SoFi Stadium' },
  { id: 'm18', venue_id: '3', match_type: 'group', match_date: '2026-06-20', description: 'Group L — England vs Ghana', venue_name: 'SoFi Stadium' },
  { id: 'm19', venue_id: '4', match_type: 'group', match_date: '2026-06-14', description: 'Group E — Germany vs Ecuador', venue_name: 'Mercedes-Benz Stadium' },
  { id: 'm20', venue_id: '4', match_type: 'group', match_date: '2026-06-18', description: 'Group F — Netherlands vs Sweden', venue_name: 'Mercedes-Benz Stadium' },
  { id: 'm21', venue_id: '5', match_type: 'group', match_date: '2026-06-13', description: 'Group C — Brazil vs Haiti', venue_name: 'NRG Stadium' },
  { id: 'm22', venue_id: '5', match_type: 'group', match_date: '2026-06-17', description: 'Group D — Paraguay vs Australia', venue_name: 'NRG Stadium' },
  { id: 'm23', venue_id: '5', match_type: 'group', match_date: '2026-06-22', description: 'Group I — Norway vs Iraq', venue_name: 'NRG Stadium' },
  { id: 'm24', venue_id: '6', match_type: 'group', match_date: '2026-06-14', description: 'Group D — United States vs Paraguay', venue_name: 'Arrowhead Stadium' },
  { id: 'm25', venue_id: '6', match_type: 'group', match_date: '2026-06-19', description: 'Group I — France vs Norway', venue_name: 'Arrowhead Stadium' },
  { id: 'm26', venue_id: '7', match_type: 'group', match_date: '2026-06-13', description: 'Group F — Japan vs Tunisia', venue_name: 'Hard Rock Stadium' },
  { id: 'm27', venue_id: '7', match_type: 'group', match_date: '2026-06-17', description: 'Group K — Portugal vs Colombia', venue_name: 'Hard Rock Stadium' },
  { id: 'm28', venue_id: '8', match_type: 'group', match_date: '2026-06-15', description: 'Group E — Curaçao vs Ivory Coast', venue_name: 'Lincoln Financial Field' },
  { id: 'm29', venue_id: '8', match_type: 'group', match_date: '2026-06-20', description: 'Group J — Argentina vs Jordan', venue_name: 'Lincoln Financial Field' },
  { id: 'm30', venue_id: '9', match_type: 'group', match_date: '2026-06-14', description: 'Group C — Scotland vs Haiti', venue_name: "Levi's Stadium" },
  { id: 'm31', venue_id: '9', match_type: 'group', match_date: '2026-06-18', description: 'Group G — Belgium vs Iran', venue_name: "Levi's Stadium" },
  { id: 'm32', venue_id: '9', match_type: 'group', match_date: '2026-06-22', description: 'Group L — Croatia vs Panama', venue_name: "Levi's Stadium" },
  { id: 'm33', venue_id: '10', match_type: 'group', match_date: '2026-06-12', description: 'Group B — Canada vs Switzerland', venue_name: 'Lumen Field' },
  { id: 'm34', venue_id: '10', match_type: 'group', match_date: '2026-06-16', description: 'Group G — Egypt vs New Zealand', venue_name: 'Lumen Field' },
  { id: 'm35', venue_id: '10', match_type: 'group', match_date: '2026-06-21', description: 'Group H — Spain vs Uruguay', venue_name: 'Lumen Field' },
  { id: 'm36', venue_id: '11', match_type: 'group', match_date: '2026-06-13', description: 'Group E — Germany vs Ivory Coast', venue_name: 'Gillette Stadium' },
  { id: 'm37', venue_id: '11', match_type: 'group', match_date: '2026-06-19', description: 'Group J — Algeria vs Jordan', venue_name: 'Gillette Stadium' },
  { id: 'm38', venue_id: '13', match_type: 'group', match_date: '2026-06-14', description: 'Group A — Mexico vs South Korea', venue_name: 'Estadio BBVA' },
  { id: 'm39', venue_id: '13', match_type: 'group', match_date: '2026-06-20', description: 'Group K — DR Congo vs Uzbekistan', venue_name: 'Estadio BBVA' },
  { id: 'm40', venue_id: '14', match_type: 'group', match_date: '2026-06-15', description: 'Group A — Czech Republic vs South Africa', venue_name: 'Estadio Akron' },
  { id: 'm41', venue_id: '14', match_type: 'group', match_date: '2026-06-21', description: 'Group L — England vs Panama', venue_name: 'Estadio Akron' },
  { id: 'm42', venue_id: '15', match_type: 'group', match_date: '2026-06-11', description: 'Group B — Canada vs Qatar', venue_name: 'BC Place' },
  { id: 'm43', venue_id: '15', match_type: 'group', match_date: '2026-06-16', description: 'Group H — Saudi Arabia vs Spain', venue_name: 'BC Place' },
  { id: 'm44', venue_id: '15', match_type: 'group', match_date: '2026-06-22', description: 'Group H — Uruguay vs Cape Verde', venue_name: 'BC Place' },
  { id: 'm45', venue_id: '16', match_type: 'group', match_date: '2026-06-12', description: 'Group B — Switzerland vs Bosnia', venue_name: 'BMO Field' },
  { id: 'm46', venue_id: '16', match_type: 'group', match_date: '2026-06-18', description: 'Group H — Spain vs Cape Verde', venue_name: 'BMO Field' },
  // Round of 32 — June 28-30
  { id: 'm47', venue_id: '1', match_type: 'r32', match_date: '2026-06-28', description: 'R32 Match 1 — AT&T Stadium', venue_name: 'AT&T Stadium' },
  { id: 'm48', venue_id: '2', match_type: 'r32', match_date: '2026-06-28', description: 'R32 Match 2 — MetLife Stadium', venue_name: 'MetLife Stadium' },
  { id: 'm49', venue_id: '3', match_type: 'r32', match_date: '2026-06-29', description: 'R32 Match 3 — SoFi Stadium', venue_name: 'SoFi Stadium' },
  { id: 'm50', venue_id: '4', match_type: 'r32', match_date: '2026-06-29', description: 'R32 Match 4 — Mercedes-Benz Stadium', venue_name: 'Mercedes-Benz Stadium' },
  { id: 'm51', venue_id: '5', match_type: 'r32', match_date: '2026-06-30', description: 'R32 Match 5 — NRG Stadium', venue_name: 'NRG Stadium' },
  { id: 'm52', venue_id: '6', match_type: 'r32', match_date: '2026-06-30', description: 'R32 Match 6 — Arrowhead Stadium', venue_name: 'Arrowhead Stadium' },
  { id: 'm53', venue_id: '7', match_type: 'r32', match_date: '2026-06-30', description: 'R32 Match 7 — Hard Rock Stadium', venue_name: 'Hard Rock Stadium' },
  // Round of 16 — July 2-5
  { id: 'm54', venue_id: '1', match_type: 'r16', match_date: '2026-07-02', description: 'R16 Match 1 — AT&T Stadium', venue_name: 'AT&T Stadium' },
  { id: 'm55', venue_id: '2', match_type: 'r16', match_date: '2026-07-03', description: 'R16 Match 2 — MetLife Stadium', venue_name: 'MetLife Stadium' },
  { id: 'm56', venue_id: '3', match_type: 'r16', match_date: '2026-07-03', description: 'R16 Match 3 — SoFi Stadium', venue_name: 'SoFi Stadium' },
  { id: 'm57', venue_id: '4', match_type: 'r16', match_date: '2026-07-04', description: 'R16 Match 4 — Mercedes-Benz Stadium', venue_name: 'Mercedes-Benz Stadium' },
  { id: 'm58', venue_id: '5', match_type: 'r16', match_date: '2026-07-04', description: 'R16 Match 5 — NRG Stadium', venue_name: 'NRG Stadium' },
  { id: 'm59', venue_id: '6', match_type: 'r16', match_date: '2026-07-05', description: 'R16 Match 6 — Arrowhead Stadium', venue_name: 'Arrowhead Stadium' },
  { id: 'm60', venue_id: '7', match_type: 'r16', match_date: '2026-07-05', description: 'R16 Match 7 — Hard Rock Stadium', venue_name: 'Hard Rock Stadium' },
  // Quarter-Finals — July 9-10
  { id: 'm61', venue_id: '1', match_type: 'qf', match_date: '2026-07-09', description: 'Quarter-Final 1 — AT&T Stadium', venue_name: 'AT&T Stadium' },
  { id: 'm62', venue_id: '2', match_type: 'qf', match_date: '2026-07-09', description: 'Quarter-Final 2 — MetLife Stadium', venue_name: 'MetLife Stadium' },
  { id: 'm63', venue_id: '3', match_type: 'qf', match_date: '2026-07-10', description: 'Quarter-Final 3 — SoFi Stadium', venue_name: 'SoFi Stadium' },
  { id: 'm64', venue_id: '4', match_type: 'qf', match_date: '2026-07-10', description: 'Quarter-Final 4 — Mercedes-Benz Stadium', venue_name: 'Mercedes-Benz Stadium' },
  // Semi-Finals — July 14-15
  { id: 'm3', venue_id: '1', match_type: 'semifinal', match_date: '2026-07-14', description: 'Semi-Final 1 — AT&T Stadium', venue_name: 'AT&T Stadium' },
  { id: 'm4', venue_id: '3', match_type: 'semifinal', match_date: '2026-07-15', description: 'Semi-Final 2 — SoFi Stadium', venue_name: 'SoFi Stadium' },
  // 3rd Place — July 18
  { id: 'm65', venue_id: '7', match_type: 'third_place', match_date: '2026-07-18', description: 'Third Place Match — Hard Rock Stadium', venue_name: 'Hard Rock Stadium' },
  // Final — July 19
  { id: 'm2', venue_id: '2', match_type: 'final', match_date: '2026-07-19', description: 'World Cup Final 2026 — MetLife Stadium', venue_name: 'MetLife Stadium' },
]

const IMG = {
  luxurySuite: 'https://images.unsplash.com/photo-1573879541250-58ae8b322b40?w=600&q=80',
  privateJet: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80',
  luxuryCar: 'https://images.unsplash.com/photo-1631295868223-63265b40d498?w=600&q=80',
  stadiumVIP: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',
  stadiumCrowd: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80',
  cryptoLuxury: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&q=80',
}

export const packages = [
  // ===== OPENING MATCH (Estadio Azteca, June 11) =====
  { id: 'p1', image: IMG.luxurySuite, name: 'Presidential Suite — Opening', match_id: 'm1', match_type: 'opening', match_date: '2026-06-11', venue_name: 'Estadio Azteca', description: 'Rolls Royce Phantom pickup, Category 1 seats, pre-match hospitality lounge with champagne service, dedicated driver for the day.', price_usd: 45000, includes_jet: false, includes_rolls_royce: true, includes_hospitality: true, seats: 'Category 1', available: 4, crypto_only: false },
  { id: 'p2', image: IMG.stadiumVIP, name: 'Diamond Hospitality — Opening', match_id: 'm1', match_type: 'opening', match_date: '2026-06-11', venue_name: 'Estadio Azteca', description: 'Premium hospitality suite with gourmet catering, premium seating, dedicated concierge, and parking.', price_usd: 25000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Premium', available: 8, crypto_only: false },
  { id: 'p3', image: IMG.stadiumCrowd, name: 'Gold Experience — Opening', match_id: 'm1', match_type: 'opening', match_date: '2026-06-11', venue_name: 'Estadio Azteca', description: 'Category 2 seating with pre-match reception, welcome gift bag, and match program.', price_usd: 12000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 2', available: 15, crypto_only: false },
  { id: 'p4', image: IMG.stadiumCrowd, name: 'Silver Seat — Opening', match_id: 'm1', match_type: 'opening', match_date: '2026-06-11', venue_name: 'Estadio Azteca', description: 'Standard seat with access to fan zone. Best value for the historic opening match.', price_usd: 5000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Standard', available: 30, crypto_only: false },

  // ===== GROUP STAGE (various venues) =====
  { id: 'p5', image: IMG.stadiumVIP, name: 'VIP Skybox — Group Stage', match_id: 'm9', match_type: 'group', match_date: '2026-06-12', venue_name: 'AT&T Stadium', description: 'Private skybox suite with dedicated catering, private bar, VIP parking, and personal host.', price_usd: 25000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 6, crypto_only: false },
  { id: 'p6', image: IMG.stadiumVIP, name: 'Premium Lounge — Group Stage', match_id: 'm16', match_type: 'group', match_date: '2026-06-12', venue_name: 'SoFi Stadium', description: 'Premium seating with hospitality lounge access, complimentary refreshments, and dedicated service.', price_usd: 12000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Premium', available: 12, crypto_only: false },
  { id: 'p7', image: IMG.stadiumCrowd, name: 'Standard Entry — Group Stage', match_id: 'm33', match_type: 'group', match_date: '2026-06-12', venue_name: 'Lumen Field', description: 'Standard seat — enjoy world-class football at an accessible price point.', price_usd: 3500, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Standard', available: 50, crypto_only: false },

  // ===== ROUND OF 32 =====
  { id: 'p8', image: IMG.stadiumVIP, name: 'Chairman\'s Suite — R32', match_id: 'm47', match_type: 'r32', match_date: '2026-06-28', venue_name: 'AT&T Stadium', description: 'Chairman\'s suite with premium catering, private bar, VIP parking, and personal concierge service.', price_usd: 35000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Chairman\'s Suite', available: 4, crypto_only: false },
  { id: 'p9', image: IMG.stadiumVIP, name: 'Platinum — R32', match_id: 'm48', match_type: 'r32', match_date: '2026-06-28', venue_name: 'MetLife Stadium', description: 'Category 1 seats with lounge access, match program, and commemorative gift.', price_usd: 18000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Category 1', available: 10, crypto_only: false },
  { id: 'p10', image: IMG.stadiumCrowd, name: 'Silver — R32', match_id: 'm49', match_type: 'r32', match_date: '2026-06-29', venue_name: 'SoFi Stadium', description: 'Category 2 seating — great seats for the knockout stage action.', price_usd: 8000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 2', available: 20, crypto_only: false },

  // ===== ROUND OF 16 =====
  { id: 'p11', image: IMG.stadiumVIP, name: 'Diamond Suite — R16', match_id: 'm54', match_type: 'r16', match_date: '2026-07-02', venue_name: 'AT&T Stadium', description: 'Diamond suite with premium catering, private butler, champagne bar, and VIP parking.', price_usd: 50000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Diamond Suite', available: 4, crypto_only: false },
  { id: 'p12', image: IMG.stadiumVIP, name: 'Platinum Lounge — R16', match_id: 'm55', match_type: 'r16', match_date: '2026-07-03', venue_name: 'MetLife Stadium', description: 'Category 1 seats with hospitality lounge, dedicated server, and premium bar.', price_usd: 25000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Category 1', available: 8, crypto_only: false },
  { id: 'p13', image: IMG.stadiumCrowd, name: 'Gold — R16', match_id: 'm57', match_type: 'r16', match_date: '2026-07-04', venue_name: 'Mercedes-Benz Stadium', description: 'Category 2 seating with match program and drink voucher.', price_usd: 12000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 2', available: 15, crypto_only: false },

  // ===== QUARTER-FINALS =====
  { id: 'p14', image: IMG.luxurySuite, name: 'Presidential Suite — QF', match_id: 'm61', match_type: 'qf', match_date: '2026-07-09', venue_name: 'AT&T Stadium', description: 'Presidential suite, private concierge, gourmet catering, champagne bar, and VIP parking. The premium quarter-final experience.', price_usd: 75000, includes_jet: false, includes_rolls_royce: true, includes_hospitality: true, seats: 'Presidential Suite', available: 2, crypto_only: false },
  { id: 'p15', image: IMG.stadiumVIP, name: 'Skybox Elite — QF', match_id: 'm62', match_type: 'qf', match_date: '2026-07-09', venue_name: 'MetLife Stadium', description: 'Premium skybox with dedicated catering, private bar, VIP host, and commemorative gifts.', price_usd: 45000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 6, crypto_only: false },
  { id: 'p16', image: IMG.stadiumCrowd, name: 'Gold Experience — QF', match_id: 'm63', match_type: 'qf', match_date: '2026-07-10', venue_name: 'SoFi Stadium', description: 'Category 1 seats with lounge access and VIP parking.', price_usd: 22000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 1', available: 10, crypto_only: false },
  { id: 'p17', image: IMG.stadiumCrowd, name: 'Silver Seat — QF', match_id: 'm64', match_type: 'qf', match_date: '2026-07-10', venue_name: 'Mercedes-Benz Stadium', description: 'Category 2 seating. Witness the world\'s best battle for a semi-final spot.', price_usd: 14000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 2', available: 20, crypto_only: false },

  // ===== SEMI-FINALS =====
  { id: 'p18', image: IMG.privateJet, name: 'Presidential Suite — Semi-Final', match_id: 'm3', match_type: 'semifinal', match_date: '2026-07-14', venue_name: 'AT&T Stadium', description: 'Presidential suite, private Gulfstream jet transfer, Rolls Royce Phantom pickup, personal concierge, gourmet catering, champagne bar.', price_usd: 125000, includes_jet: true, includes_rolls_royce: true, includes_hospitality: true, seats: 'Presidential Suite', available: 2, crypto_only: false },
  { id: 'p19', image: IMG.stadiumVIP, name: 'Skybox VIP — Semi-Final', match_id: 'm3', match_type: 'semifinal', match_date: '2026-07-14', venue_name: 'AT&T Stadium', description: 'Premium skybox suite with dedicated catering, private bar, VIP parking, and personal host. Optional private jet addon available.', price_usd: 65000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 6, crypto_only: false },
  { id: 'p20', image: IMG.stadiumVIP, name: 'Platinum — Semi-Final', match_id: 'm4', match_type: 'semifinal', match_date: '2026-07-15', venue_name: 'SoFi Stadium', description: 'Category 1 seats with premium hospitality lounge, dedicated server, and champagne toast.', price_usd: 35000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Category 1', available: 8, crypto_only: false },
  { id: 'p21', image: IMG.stadiumCrowd, name: 'Gold — Semi-Final', match_id: 'm4', match_type: 'semifinal', match_date: '2026-07-15', venue_name: 'SoFi Stadium', description: 'Category 2 seating — premium view of the semi-final action.', price_usd: 18000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 2', available: 15, crypto_only: false },

  // ===== THIRD PLACE =====
  { id: 'p22', image: IMG.stadiumVIP, name: 'VIP Suite — Third Place', match_id: 'm65', match_type: 'third_place', match_date: '2026-07-18', venue_name: 'Hard Rock Stadium', description: 'VIP suite with premium hospitality, private bar, and dedicated concierge for the bronze medal match.', price_usd: 50000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'VIP Suite', available: 4, crypto_only: false },
  { id: 'p23', image: IMG.stadiumCrowd, name: 'Platinum — Third Place', match_id: 'm65', match_type: 'third_place', match_date: '2026-07-18', venue_name: 'Hard Rock Stadium', description: 'Category 1 seats with hospitality lounge and commemorative medal.', price_usd: 25000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 1', available: 8, crypto_only: false },
  { id: 'p24', image: IMG.stadiumCrowd, name: 'Silver Seat — Third Place', match_id: 'm65', match_type: 'third_place', match_date: '2026-07-18', venue_name: 'Hard Rock Stadium', description: 'Standard seating — be there for the bronze medal ceremony.', price_usd: 12000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Standard', available: 25, crypto_only: false },

  // ===== FINAL (MetLife Stadium, July 19) =====
  { id: 'p25', image: IMG.cryptoLuxury, name: '🐋 Crypto Whale Concierge — Final', match_id: 'm2', match_type: 'final', match_date: '2026-07-19', venue_name: 'MetLife Stadium', description: 'The ultimate: Gulfstream G650 private jet, Rolls Royce fleet (Phantom + Cullinan), penthouse suite, personal butler, private chef, best seats in the house. BTC/ETH only. Discreet, no KYC.', price_usd: 500000, includes_jet: true, includes_rolls_royce: true, includes_hospitality: true, seats: 'Presidential Suite', available: 1, crypto_only: true },
  { id: 'p26', image: IMG.luxurySuite, name: 'Presidential Suite — Final', match_id: 'm2', match_type: 'final', match_date: '2026-07-19', venue_name: 'MetLife Stadium', description: 'Ultimate VIP: Presidential suite at MetLife Stadium, private Gulfstream jet transfer, Rolls Royce Phantom pickup/dropoff, personal concierge, gourmet catering, champagne bar.', price_usd: 250000, includes_jet: true, includes_rolls_royce: true, includes_hospitality: true, seats: 'Presidential Suite', available: 2, crypto_only: false },
  { id: 'p27', image: IMG.stadiumVIP, name: 'Platinum Skybox — Final', match_id: 'm2', match_type: 'final', match_date: '2026-07-19', venue_name: 'MetLife Stadium', description: 'Elite skybox suite with premium catering, private bar, dedicated host, VIP parking, and commemorative crystal trophy.', price_usd: 100000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 4, crypto_only: false },
  { id: 'p28', image: IMG.stadiumVIP, name: 'Gold — Final', match_id: 'm2', match_type: 'final', match_date: '2026-07-19', venue_name: 'MetLife Stadium', description: 'Category 1 seats with hospitality lounge, champagne reception, and official match program.', price_usd: 50000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Category 1', available: 8, crypto_only: false },

  // ===== DECOY PACKAGES (conversion optimization) =====
  // Opening decoy — Diamond Plus at $24k (same seats as Diamond $25k but NO hospitality lounge)
  { id: 'p29', image: IMG.stadiumVIP, name: 'Diamond Plus — Opening', match_id: 'm1', match_type: 'opening', match_date: '2026-06-11', venue_name: 'Estadio Azteca', description: 'Category 1 premium seating with dedicated concierge and VIP parking.', price_usd: 24000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 1', available: 3, crypto_only: false },

  // Group Stage decoy — Skybox Light at $23k (same as Skybox $25k but no catering, no private bar)
  { id: 'p30', image: IMG.stadiumVIP, name: 'Skybox Light — Group Stage', match_id: 'm9', match_type: 'group', match_date: '2026-06-12', venue_name: 'AT&T Stadium', description: 'Category 1 seating with dedicated host and match program. No catering or private bar included.', price_usd: 23000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: false, seats: 'Category 1', available: 3, crypto_only: false },

  // Final decoy — Platinum Skybox Elite at $160k (same as Platinum $100k but adds champagne bar for $60k more)
  { id: 'p31', image: IMG.stadiumVIP, name: 'Platinum Skybox Elite — Final', match_id: 'm2', match_type: 'final', match_date: '2026-07-19', venue_name: 'MetLife Stadium', description: 'Elite skybox suite with premium catering, private bar, dedicated host, VIP parking, commemorative crystal trophy, and premium champagne bar.', price_usd: 160000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 2, crypto_only: false },

  // Semi-Final decoy — Skybox Elite at $85k (same as Skybox $65k but adds VIP parking and welcome champagne)
  { id: 'p32', image: IMG.stadiumVIP, name: 'Skybox Elite — Semi-Final', match_id: 'm3', match_type: 'semifinal', match_date: '2026-07-14', venue_name: 'AT&T Stadium', description: 'Premium skybox suite with dedicated catering, private bar, personal host, VIP parking, and welcome champagne.', price_usd: 85000, includes_jet: false, includes_rolls_royce: false, includes_hospitality: true, seats: 'Skybox Suite', available: 3, crypto_only: false },
]

export type Venue = typeof venues[0]
export type Match = typeof matches[0]
export type Package = typeof packages[0]
export type Group = typeof groups[0]
