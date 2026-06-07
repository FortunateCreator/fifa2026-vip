import Link from 'next/link'
import { matches, packages } from '@/lib/data'
import { Crown, MapPin, Calendar, ArrowRight, Shield, DollarSign } from 'lucide-react'

const matchTypes = [
  { key: 'opening', slug: 'opening', label: 'Opening Match', emoji: '🎌', desc: 'Mexico vs South Africa — the tournament kickoff at Estadio Azteca.' },
  { key: 'group', slug: 'group-stage', label: 'Group Stage', emoji: '⚽', desc: '48 matches across 16 venues. Every team, every group, every moment.' },
  { key: 'r32', slug: 'round-of-32', label: 'Round of 32', emoji: '🔁', desc: 'The knockout stage begins. 32 teams, one shot at glory.' },
  { key: 'r16', slug: 'round-of-16', label: 'Round of 16', emoji: '🔄', desc: 'Survivors battle for quarter-final berths. The intensity doubles.' },
  { key: 'qf', slug: 'quarter-final', label: 'Quarter-Final', emoji: '⚔️', desc: 'Eight teams remain. Every match is a war for semi-final passage.' },
  { key: 'semifinal', slug: 'semi-final', label: 'Semi-Final', emoji: '🏆', desc: 'The final four. Two matches separate the contenders from immortality.' },
  { key: 'third_place', slug: 'third-place', label: 'Third Place', emoji: '🥉', desc: 'The bronze medal match — pride, glory, and a podium finish.' },
  { key: 'final', slug: 'final', label: 'The Final', emoji: '👑', desc: 'World Cup Final 2026 at MetLife Stadium. History awaits.' },
]

export default function MatchesPage() {
  const matchTypeData = matchTypes.map((mt) => {
    const typePackages = packages.filter((p) => p.match_type === mt.key)
    const typeMatches = matches.filter((m) => m.match_type === mt.key)
    const startingPrice = typePackages.length > 0
      ? Math.min(...typePackages.map((p) => p.price_usd))
      : null
    const firstDate = typeMatches.length > 0 ? typeMatches[0].match_date : null
    const venues = [...new Set(typeMatches.map((m) => m.venue_name))]
    const totalPkgs = typePackages.reduce((sum, p) => sum + p.available, 0)

    return { ...mt, startingPrice, firstDate, venues, totalPkgs, matchCount: typeMatches.length }
  })

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            <Crown className="h-3.5 w-3.5" />
            FIFA 2026 Match Experiences
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl md:leading-tight">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">Match</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            From the opening whistle at Estadio Azteca to the Final at MetLife Stadium — every match has a VIP tier designed for you.
          </p>
        </div>
      </section>

      {/* Match Type Cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {matchTypeData.map((mt) => (
              <Link
                key={mt.key}
                href={`/matches/${mt.slug}`}
                className="group relative flex flex-col rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/40 hover:shadow-[0_0_30px_rgba(212,168,83,0.1)]"
              >
                <div className="mb-4 text-3xl">{mt.emoji}</div>
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-gold-400 transition-colors">{mt.label}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-400">{mt.desc}</p>

                <div className="mb-4 space-y-1.5 text-xs text-gray-500">
                  {mt.firstDate && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-gold-400/70" />
                      {new Date(mt.firstDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                  {mt.venues.length > 0 && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gold-400/70" />
                      {mt.venues.slice(0, 2).join(', ')}{mt.venues.length > 2 ? ` +${mt.venues.length - 2}` : ''}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-gold-400/70" />
                    {mt.matchCount} match{mt.matchCount !== 1 ? 'es' : ''} · {mt.totalPkgs} packages available
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-dark-border pt-4">
                  <div>
                    {mt.startingPrice ? (
                      <span className="flex items-center gap-1 text-lg font-bold text-gold-400">
                        <DollarSign className="h-4 w-4" />
                        {mt.startingPrice.toLocaleString()}
                        <span className="text-xs font-normal text-gray-500">/ person from</span>
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">Contact for pricing</span>
                    )}
                  </div>
                  <ArrowRight className="h-5 w-5 text-gold-400 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-t border-dark-border py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="rounded-2xl border border-dark-border bg-dark-900/40 px-6 py-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {[
                { value: '500+', label: 'HNWI Clients' },
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

      {/* CTA */}
      <section className="border-t border-dark-border py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Not Sure Which Match?{' '}
            <span className="text-gold-400">We&apos;ll Curate It.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Tell us your preferences and our concierge team will build a personalized itinerary — from a single match to the entire tournament.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
