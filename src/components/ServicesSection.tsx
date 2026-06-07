'use client'

import { Plane, Car, Crown, Bitcoin, ArrowRight, Hotel, Shield } from 'lucide-react'

const services = [
  { icon: Plane, title: 'Private Jet Charters', desc: 'Gulfstream G650 & Bombardier Global 7500. Fly direct to any host city on your schedule.' },
  { icon: Car, title: 'Rolls Royce Fleet', desc: 'Phantom, Cullinan, Ghost. Chauffeur-driven pickup from airport, hotel, and stadium.' },
  { icon: Crown, title: 'Presidential Suites', desc: 'Best seats in every stadium. Private lounges, gourmet catering, personal butler service.' },
  { icon: Bitcoin, title: 'Crypto Payments', desc: 'Pay in BTC, ETH, or USDT. Discreet, secure, no banking restrictions. Preferred by HNWI clients.' },
  { icon: Hotel, title: 'Penthouse Accommodation', desc: 'Five-star penthouses in every host city. Complimentary for Crypto Whale package clients.' },
  { icon: Shield, title: 'White-Glove Security', desc: 'Personal security detail, discreet transportation, private entrances. For clients in restricted regions.' },
  { icon: Shield, title: '🇺🇳 Restricted Region Access', desc: 'Dedicated concierge for clients from Iran, Haiti, Ivory Coast, Senegal, and other restricted regions — visa facilitation, discreet border coordination, secure transport within host nations, crypto payment processing, and privacy guarantees.' },
]

export default function ServicesSection() {
  return (
    <section id="services" className="border-t border-dark-border py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Unmatched <span className="text-gold-400">VIP Infrastructure</span>
          </h2>
          <p className="mt-3 text-gray-400">Every detail engineered for the ultra-wealthy</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30 hover:bg-dark-800/80"
            >
              <s.icon className="mb-4 h-8 w-8 text-gold-400" />
              <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
