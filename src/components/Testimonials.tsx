'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'James H.',
    title: 'Hedge Fund Manager, London',
    quote: 'The Presidential Suite experience was beyond anything we imagined. The private jet, Rolls Royce, and personal concierge made us feel like royalty.',
  },
  {
    name: 'Elena V.',
    title: 'Crypto Investor, Dubai',
    quote: 'As a crypto investor, finding a concierge that truly understands discreet payments was crucial. Vantage 26 delivered flawlessly.',
  },
  {
    name: 'Marcus T.',
    title: 'CEO, Singapore',
    quote: 'Our corporate group of 8 was handled with absolute precision. Every detail was anticipated before we even asked.',
  },
  {
    name: 'Dr. Amir K.',
    title: 'Diplomat, Geneva',
    quote: 'The banned region concierge service was a lifesaver. They handled visas, border coordination, and secure transport seamlessly.',
  },
  {
    name: 'Dmitri P.',
    title: 'Private Equity, Monaco',
    quote: "I've attended 4 World Cups. Nothing compares to the Vantage 26 treatment. Worth every satoshi.",
  },
]

const stats = [
  { value: '500+', label: 'HNWI Clients Served' },
  { value: '16', label: 'World-Class Stadiums' },
  { value: '10+', label: 'Years Concierge Experience' },
  { value: '48', label: 'Countries Represented' },
  { value: '100%', label: 'Discreet & Secure' },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="border-t border-dark-border py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Trusted by{' '}
            <span className="text-gold-400">Discerning Clients</span> Worldwide
          </h2>
          <p className="mt-3 text-gray-400">
            Hear from the ultra-high-net-worth individuals who trust Vantage 26
          </p>
        </div>

        {/* Testimonial Cards — 2x2 grid on desktop, stacked on mobile */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30"
            >
              <div className="mb-4 flex items-center gap-3">
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
              <Stars />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Stats/Trust Bar */}
        <div className="mt-16 rounded-2xl border border-dark-border bg-dark-900/40 px-6 py-10 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-gold-400 md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
