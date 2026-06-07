import Link from 'next/link'
import { Plane, Car, Crown, Bitcoin, Hotel, Shield, Headphones, Utensils, Wine, ArrowRight, CheckCircle, Star } from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Private Jet Charter',
    desc: 'Gulfstream G650 & Bombardier Global 7500. Fly direct to any host city on your schedule. Complimentary champagne and gourmet in-flight catering.',
    features: ['Direct to any host city', 'Flexible scheduling', 'Gourmet in-flight dining', 'Dedicated flight crew'],
  },
  {
    icon: Car,
    title: 'Rolls Royce Fleet',
    desc: 'Phantom, Cullinan, Ghost. Chauffeur-driven pickup from airport, hotel, and stadium. Your personal fleet for the duration of your stay.',
    features: ['Phantom / Cullinan / Ghost', 'Chauffeur service', '24/7 on-call', 'Airport & stadium transfers'],
  },
  {
    icon: Crown,
    title: 'Presidential Suites',
    desc: 'The finest seats in every stadium. Private lounges with gourmet catering, personal butler service, and dedicated concierge for every match.',
    features: ['Category 1 & Suite seating', 'Personal butler', 'Gourmet catering', 'VIP entrance & parking'],
  },
  {
    icon: Headphones,
    title: 'Personal Concierge',
    desc: 'A dedicated concierge assigned to you for your entire journey. From restaurant reservations to last-minute requests — nothing is too much.',
    features: ['24/7 dedicated concierge', 'Multi-lingual team', 'Restaurant & event booking', 'Emergency support'],
  },
  {
    icon: Utensils,
    title: 'Gourmet Catering',
    desc: 'Michelin-starred chefs curate your match-day dining. Multi-course menus with wine pairings, served in your private suite.',
    features: ['Michelin-starred chefs', 'Custom menu planning', 'Premium wine & champagne', 'Dietary accommodations'],
  },
  {
    icon: Wine,
    title: 'Champagne Bar',
    desc: 'Full-service champagne and premium spirits bar in every hospitality suite. Dom Pérignon, Krug, Cristal — your preference, always stocked.',
    features: ['Dom Pérignon & Krug', 'Premium spirits selection', 'Dedicated bartender', 'Open bar throughout match'],
  },
  {
    icon: Shield,
    title: 'Secure Transport',
    desc: 'Discreet, armored vehicle options available. Private entrances, secure corridors, and personal security detail for clients who require it.',
    features: ['Armored vehicle options', 'Personal security detail', 'Private entrances', 'Secure route planning'],
  },
  {
    icon: Bitcoin,
    title: 'Crypto Payments',
    desc: 'Pay in BTC, ETH, or USDT. No banks, no borders, no KYC friction. Instant on-chain confirmation. Preferred by HNWI clients worldwide.',
    features: ['BTC / ETH / USDT', 'Zero KYC for qualified clients', 'Instant confirmation', 'Refundable in crypto'],
  },
]

const testimonials = [
  { name: 'James H.', title: 'Hedge Fund Manager, London', quote: 'The Presidential Suite experience was beyond anything we imagined. The private jet, Rolls Royce, and personal concierge made us feel like royalty.' },
  { name: 'Elena V.', title: 'Crypto Investor, Dubai', quote: 'Finding a concierge that truly understands discreet payments was crucial. Vantage 26 delivered flawlessly.' },
  { name: 'Marcus T.', title: 'CEO, Singapore', quote: 'Our corporate group of 8 was handled with absolute precision. Every detail was anticipated before we even asked.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            <Crown className="h-3.5 w-3.5" />
            Vantage 26 Treatment
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl md:leading-tight">
            Beyond VIP.{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              The Vantage 26 Treatment.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Every detail engineered for the ultra-wealthy. From private jets to presidential suites, 
            we don&apos;t just meet expectations — we define what&apos;s possible.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book Your Experience
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Private Jets</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Rolls Royce Fleet</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Presidential Suites</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Crypto Payments</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 24hr Concierge</span>
          </div>
        </div>
      </section>

      {/* ===== SERVICE CARDS ===== */}
      <section className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Everything You Need.{' '}
              <span className="text-gold-400">Nothing You Don&apos;t.</span>
            </h2>
            <p className="mt-3 text-gray-400">
              A complete ecosystem of luxury services — coordinated seamlessly by your personal concierge.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30 hover:bg-dark-800/80 hover:shadow-[0_0_20px_rgba(212,168,83,0.08)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                  {s.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-400">
                  {s.desc}
                </p>
                <ul className="space-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                      <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-gold-400/70" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="border-t border-dark-border py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Trusted by{' '}
              <span className="text-gold-400">Discerning Clients</span> Worldwide
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30"
              >
                <div className="mb-4 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3 border-t border-dark-border pt-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=212&color=D4A853&bold=true&size=40`}
                    alt={t.name}
                    className="h-10 w-10 rounded-full"
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
                { value: '500+', label: 'HNWI Clients Served' },
                { value: '16', label: 'World-Class Stadiums' },
                { value: '10+', label: 'Years Concierge Experience' },
                { value: '48', label: 'Countries Represented' },
                { value: '100%', label: 'Discreet & Secure' },
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
            <Crown className="h-3.5 w-3.5" />
            Secure Your Experience
          </div>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Ready for the{' '}
            <span className="text-gold-400">Ultimate Treatment?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Submit a confidential enquiry. Our senior concierge team will respond within 24 hours
            with a curated proposal tailored to your exact preferences.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-10 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-dark-800/60 px-8 py-4 text-sm font-medium text-gray-300 transition hover:border-gold-400/30 hover:text-white"
            >
              Browse Matches
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            All enquiries handled with absolute discretion. No identifying information shared externally.
          </p>
        </div>
      </section>
    </div>
  )
}
