import Link from 'next/link'
import { notFound } from 'next/navigation'
import { matches, packages } from '@/lib/data'
import { Calendar, MapPin, Plane, Car, Crown, Shield, CheckCircle, ArrowRight, Clock, Users, Star } from 'lucide-react'

// Slug → match_type mapping
const slugToType: Record<string, string> = {
  'opening': 'opening',
  'group-stage': 'group',
  'round-of-32': 'r32',
  'round-of-16': 'r16',
  'quarter-final': 'qf',
  'semi-final': 'semifinal',
  'third-place': 'third_place',
  'final': 'final',
}

const typeToSlug: Record<string, string> = {
  'opening': 'opening',
  'group': 'group-stage',
  'r32': 'round-of-32',
  'r16': 'round-of-16',
  'qf': 'quarter-final',
  'semifinal': 'semi-final',
  'third_place': 'third-place',
  'final': 'final',
}

const typeLabels: Record<string, string> = {
  opening: 'Opening Match',
  group: 'Group Stage',
  r32: 'Round of 32',
  r16: 'Round of 16',
  qf: 'Quarter-Final',
  semifinal: 'Semi-Final',
  third_place: 'Third Place',
  final: 'The Final',
}

const typeEmojis: Record<string, string> = {
  opening: '🎌',
  group: '⚽',
  r32: '🔁',
  r16: '🔄',
  qf: '⚔️',
  semifinal: '🏆',
  third_place: '🥉',
  final: '👑',
}

const typeOrder = ['opening', 'group', 'r32', 'r16', 'qf', 'semifinal', 'third_place', 'final']

const testimonials = [
  { name: 'James H.', title: 'Hedge Fund Manager, London', quote: 'The Presidential Suite experience was beyond anything we imagined. The private jet, Rolls Royce, and personal concierge made us feel like royalty.' },
  { name: 'Elena V.', title: 'Crypto Investor, Dubai', quote: 'Finding a concierge that truly understands discreet payments was crucial. Vantage 26 delivered flawlessly.' },
  { name: 'Marcus T.', title: 'CEO, Singapore', quote: 'Our corporate group of 8 was handled with absolute precision. Every detail was anticipated before we even asked.' },
  { name: 'Dmitri P.', title: 'Private Equity, Monaco', quote: "I've attended 4 World Cups. Nothing compares to the Vantage 26 treatment. Worth every satoshi." },
]

function getCountdownDays(dateStr: string): string {
  const matchDate = new Date(dateStr + 'T00:00:00')
  const now = new Date()
  const diff = matchDate.getTime() - now.getTime()
  if (diff <= 0) return 'Happening now'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days > 90) return `${days} days away`
  if (days > 30) return `${Math.floor(days / 7)} weeks away`
  return `${days} days away`
}

export default async function MatchTypePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const matchType = slugToType[slug]
  if (!matchType) notFound()

  const typePackages = packages.filter((p) => p.match_type === matchType)
  const typeMatches = matches.filter((m) => m.match_type === matchType)
  const label = typeLabels[matchType]
  const emoji = typeEmojis[matchType]

  const startingPrice = typePackages.length > 0
    ? Math.min(...typePackages.map((p) => p.price_usd))
    : null

  const firstDate = typeMatches.length > 0 ? typeMatches[0].match_date : null
  const totalAvailable = typePackages.reduce((sum, p) => sum + p.available, 0)
  const uniqueTiers = [...new Set(typePackages.map((p) => p.seats))].length

  // Get prev/next match types for navigation
  const currentIndex = typeOrder.indexOf(matchType)
  const prevMatch = currentIndex > 0 ? typeOrder[currentIndex - 1] : null
  const nextMatch = currentIndex < typeOrder.length - 1 ? typeOrder[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-dark-950">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Link href="/matches" className="hover:text-gold-400 transition-colors">All Matches</Link>
            <span>/</span>
            <span className="text-gold-400">{label}</span>
          </div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            {emoji}
            {typeMatches.length === 1 ? `${typeMatches.length} Match` : `${typeMatches.length} Matches`} Available
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl md:leading-tight">
            {label}{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              VIP Experience
            </span>
          </h1>

          {firstDate && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
              {getCountdownDays(firstDate)}
            </p>
          )}

          {/* Scarcity + Stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold-400" />
              {firstDate ? new Date(firstDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Dates TBD'}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold-400" />
              {[...new Set(typeMatches.map((m) => m.venue_name))].join(', ')}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-gold-400" />
              {totalAvailable} packages across {uniqueTiers} tiers
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            {startingPrice && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-dark-800/60 px-8 py-4 text-sm text-gray-300">
                From <span className="text-lg font-bold text-gold-400">${startingPrice.toLocaleString()}</span> / person
              </div>
            )}
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> BTC / ETH / USDT</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Private Jet Options</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Rolls Royce Transfer</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 24hr Concierge</span>
          </div>
        </div>
      </section>

      {/* ===== PACKAGE GRID ===== */}
      {typePackages.length > 0 && (
        <section className="border-t border-dark-border py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Available <span className="text-gold-400">Packages</span>
              </h2>
              <p className="mt-2 text-gray-400">
                {totalAvailable} spots remaining across {uniqueTiers} experience tiers
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {typePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group relative overflow-hidden rounded-xl border border-dark-border bg-dark-900/60 transition hover:border-gold-400/40 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]"
                >
                  {/* Image */}
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />
                    {pkg.crypto_only && (
                      <div className="absolute right-0 top-0 rounded-bl-lg bg-gold-400 px-3 py-1 text-xs font-bold text-black">
                        CRYPTO ONLY
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3">
                      <span className="rounded-full bg-black/60 px-3 py-0.5 text-xs font-medium text-gold-400 backdrop-blur-sm">
                        {pkg.seats}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-xl font-bold text-white">{pkg.name}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">{pkg.description}</p>
                    <div className="mb-4 flex items-center gap-4">
                      {pkg.includes_jet && <Plane className="h-4 w-4 text-gold-400" />}
                      {pkg.includes_rolls_royce && <Car className="h-4 w-4 text-gold-400" />}
                      {pkg.includes_hospitality && <Crown className="h-4 w-4 text-gold-400" />}
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-white">${pkg.price_usd.toLocaleString()}</span>
                      <span className="ml-2 text-xs text-gray-500">/ person</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {pkg.available > 0 ? (
                          <span className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            {pkg.available} left
                          </span>
                        ) : 'Sold out'}
                      </span>
                      <Link
                        href={`/booking?package=${pkg.id}`}
                        className="rounded-md bg-gold-400 px-5 py-2 text-sm font-bold text-black transition hover:bg-gold-300"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== TESTIMONIALS ===== */}
      <section className="border-t border-dark-border py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              What Our <span className="text-gold-400">Clients Say</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-dark-border pt-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=212&color=D4A853&bold=true&size=32`}
                    alt={t.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-t border-dark-border py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-dark-border bg-dark-900/40 px-6 py-10 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              {[
                { value: '500+', label: 'Clients Served' },
                { value: '16', label: 'Stadiums' },
                { value: '10+', label: 'Years Experience' },
                { value: '48', label: 'Countries' },
                { value: '100%', label: 'Discreet' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-gold-400 md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative border-t border-dark-border py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5" />
            Secure Your Spot
          </div>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Ready for the{' '}
            <span className="text-gold-400">{label}</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Submit a confidential enquiry. Our senior concierge team will respond within 24 hours
            with a personalized proposal — no commitment, absolute discretion.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-10 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm">
            {prevMatch && (
              <Link
                href={`/matches/${typeToSlug[prevMatch]}`}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                {typeLabels[prevMatch]}
              </Link>
            )}
            <span className="text-gray-600">|</span>
            <Link
              href="/matches"
              className="text-gray-400 hover:text-gold-400 transition-colors"
            >
              All Matches
            </Link>
            <span className="text-gray-600">|</span>
            {nextMatch && (
              <Link
                href={`/matches/${typeToSlug[nextMatch]}`}
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
              >
                {typeLabels[nextMatch]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
