'use client'

import Link from 'next/link'
import { Shield, Globe, Bitcoin, Lock, CheckCircle, ArrowRight, ChevronDown, MapPin, Users, MessageCircle, Crown, Heart } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    q: 'Is this legal?',
    a: 'Yes. We operate within international frameworks. We do not facilitate illegal entry - we provide expert concierge services, secure transport corridors, visa liaison, and hospitality that complies with all applicable regulations for restricted-region clients.',
  },
  {
    q: 'How do you handle visa restrictions?',
    a: 'Our legal team assesses your specific situation and identifies every available pathway - from third-country transit to special event accreditation. Each client receives a personalized access strategy.',
  },
  {
    q: 'Is Bitcoin payment really anonymous?',
    a: 'Yes. We accept BTC, ETH, and USDT. No bank involvement, no paper trail. Transactions are processed through our secure wallet infrastructure with zero KYC friction for qualified clients.',
  },
  {
    q: "What if I'm from a fully sanctioned country?",
    a: 'We have specialized protocols for the most complex cases. Contact us privately for a confidential assessment - no commitment required.',
  },
  {
    q: 'How discreet is your service?',
    a: 'Absolute discretion is our foundation. All communications are encrypted. Client identities are never shared. Travel manifests are handled on a need-to-know basis by our senior concierge team only.',
  },
  {
    q: 'Can I bring my family/security team?',
    a: 'Absolutely. We accommodate personal security details, family travel, and private medical support. Our group concierge packages cover parties of any size with full coordination.',
  },
]

const steps = [
  {
    icon: MessageCircle,
    title: 'Confidential Enquiry',
    desc: 'Submit a private consultation request. No personal details required upfront - just your situation and needs.',
  },
  {
    icon: Shield,
    title: 'Access Strategy',
    desc: 'Our legal and logistics team builds a personalized entry and hospitality plan tailored to your restrictions.',
  },
  {
    icon: Bitcoin,
    title: 'Secure Payment',
    desc: "Pay 100% in cryptocurrency. No banks, no borders, no questions. We'll confirm your booking within 24 hours.",
  },
  {
    icon: Crown,
    title: 'White-Glove Execution',
    desc: 'From airport meet-and-greet to stadium suite, every detail is handled by your dedicated concierge team.',
  },
]

export default function RestrictedAccessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-dark-950">

      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5" />
            Restricted Region Concierge
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl md:leading-tight">
            Banned from the US?{' '}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              We'll Get You Into FIFA 2026.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            The only FIFA 2026 concierge built for clients who can&apos;t enter the US through normal channels.
            Discreet. Crypto-native. Proven.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking?restricted=true"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-8 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-dark-800/60 px-8 py-4 text-sm font-medium text-gray-300 transition hover:border-gold-400/30 hover:text-white"
            >
              How It Works
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> BTC / ETH / USDT</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Encrypted Comms</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 500+ HNWI Clients</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 100% Discreet</span>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-gold-400/50" />
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-dark-800 px-4 py-1 text-xs uppercase tracking-widest text-gold-400">
                <MapPin className="h-3 w-3" /> The Reality
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                The World&apos;s Biggest Event - And You Can&apos;t Get In
              </h2>
              <p className="mt-4 leading-relaxed text-gray-400">
                FIFA 2026 is being hosted across the US, Mexico, and Canada. But if you&apos;re from a
                restricted region - Russia, Iran, Syria, North Korea, or anywhere under sanction -
                standard entry isn&apos;t an option.
              </p>
              <p className="mt-3 leading-relaxed text-gray-400">
                Standard travel agents can&apos;t help. Visa services turn you away. Every door
                you try leads to a dead end.
              </p>
              <div className="mt-8 rounded-xl border border-dark-border bg-dark-900/60 p-6">
                <p className="text-sm italic leading-relaxed text-gray-400">
                  &ldquo;The banned region concierge service was a lifesaver. They handled visas,
                  border coordination, and secure transport seamlessly.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src="https://ui-avatars.com/api/?name=Dr.+Amir+K.&background=212&color=D4A853&bold=true&size=40"
                    alt="Dr. Amir K."
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">Dr. Amir K.</p>
                    <p className="text-xs text-gray-500">Diplomat, Geneva</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-dark-border">
                <img
                  src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80"
                  alt="World Cup stadium atmosphere"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-dark-border bg-dark-900/90 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gold-400" />
                  <div>
                    <p className="text-sm font-bold text-white">June 11 – July 19, 2026</p>
                    <p className="text-xs text-gray-500">16 stadiums · 3 countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left: Story text */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-dark-800 px-4 py-1 text-xs uppercase tracking-widest text-gold-400">
                <Heart className="h-3 w-3" /> Our Story
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Born at a Border. <span className="text-gold-400">Built for You.</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-400">
                <p>Vantage 26 wasn&apos;t born in a boardroom. It was born at a border.</p>
                <p>Our founder watched a close friend - a legitimate businessman from a sanctioned nation - get turned away from a global event he&apos;d spent months planning for. Not because he&apos;d done anything wrong. Because his passport said a name the system didn&apos;t like.</p>
                <p>The tickets were real. The hotel was booked. The money was ready.</p>
                <p className="text-center italic text-gray-500">None of it mattered.</p>
                <p>That moment lit something. If the system wouldn&apos;t open doors for people like him, we&apos;d build a backstage entrance.</p>
                <p>Vantage 26 was built for one reason: to get you into the event you have every right to attend - regardless of where your passport was issued. We handle everything others can&apos;t or won&apos;t: visa strategy, secure transport corridors, discreet ground handling, and stadium access that bypasses every queue.</p>
                <p>From Termac pickup to your private suite, you never wait. You never worry. You never explain yourself.</p>
                <p className="text-base font-bold text-gold-400">We&apos;ve kept this promise for 500+ clients across 48 countries. We keep it for every single booking.</p>
                <p className="text-base font-bold text-gold-400">Book with confidence. If we accept your booking, you will be at that match.</p>
              </div>
              {/* Trust badge */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-xl border border-dark-border bg-dark-900/60 px-6 py-4 text-xs text-gray-400 backdrop-blur-sm">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 500+ Clients Served</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Zero Failed Deliveries</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-green-500" /> 24hr Concierge</span>
              </div>
            </div>
            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-dark-border">
                <img
                  src="https://images.unsplash.com/photo-1631295868223-63265b40d498?w=800&q=80"
                  alt="Luxury car"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              From Enquiry to{' '}
              <span className="text-gold-400">Stadium Suite</span>
            </h2>
            <p className="mt-3 text-gray-400">Four steps. Absolute discretion throughout.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="group relative rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-bold text-gold-500">STEP {i + 1}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY BTC ===== */}
      <section className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-dark-border">
                <img
                  src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80"
                  alt="Bitcoin and luxury"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl border border-dark-border bg-dark-900/90 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Bitcoin className="h-5 w-5 text-gold-400" />
                  <div>
                    <p className="text-sm font-bold text-white">BTC · ETH · USDT</p>
                    <p className="text-xs text-gray-500">Zero KYC · Instant settlement</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-dark-800 px-4 py-1 text-xs uppercase tracking-widest text-gold-400">
                <Bitcoin className="h-3 w-3" /> Crypto-Native
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                No Banks. No Borders. Just Bitcoin.
              </h2>
              <p className="mt-4 leading-relaxed text-gray-400">
                Traditional payment methods are monitored, traceable, and often blocked for
                restricted-region clients. We accept 100% cryptocurrency - no bank account needed,
                no government oversight, no paper trail.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'BTC, ETH & USDT accepted',
                  'No KYC required for qualified clients',
                  'Pay from any wallet, anywhere in the world',
                  'Instant on-chain confirmation - no delays',
                  'Refundable in crypto if circumstances change',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section className="border-t border-dark-border py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Why <span className="text-gold-400">Vantage 26</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'Restricted Region Specialists',
                desc: 'We don\'t just handle standard VIP - we built our concierge protocols specifically for clients who can\'t enter through normal channels.',
              },
              {
                icon: Users,
                title: '500+ HNWI Clients Served',
                desc: 'Our network spans 48 countries. We understand the complexity of cross-border travel for high-profile, restricted individuals.',
              },
              {
                icon: Lock,
                title: 'Military-Grade Discretion',
                desc: 'Encrypted communications, need-to-know data handling, zero client information shared with third parties. Your identity stays with us.',
              },
              {
                icon: Globe,
                title: '16 Stadiums, 3 Countries',
                desc: 'Full coverage across every US, Mexican, and Canadian venue. We coordinate transport, accommodation, and match access end-to-end.',
              },
              {
                icon: Bitcoin,
                title: 'Crypto-First Payments',
                desc: 'Built from the ground up for Bitcoin-native clients. No banks, no compliance delays, no frozen funds. Pay from your wallet, confirmed on-chain.',
              },
              {
                icon: Crown,
                title: 'End-to-End Concierge',
                desc: 'From the moment you land to the final whistle, your dedicated team handles every detail - security, transport, catering, and departure.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-dark-border bg-dark-900/60 p-6 transition hover:border-gold-400/20">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/10 text-gold-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="border-t border-dark-border py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Your Questions,{' '}
              <span className="text-gold-400">Answered</span>
            </h2>
            <p className="mt-3 text-gray-400">Everything you need to know - nothing held back.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-dark-border bg-dark-900/60 transition hover:border-gold-400/20"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gold-400 transition ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-dark-border px-6 py-5">
                    <p className="text-sm leading-relaxed text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative border-t border-dark-border py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-dark-800/80 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400 backdrop-blur-sm">
            <Lock className="h-3.5 w-3.5" />
            Confidential · No Obligation
          </div>
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Ready to Secure Your{' '}
            <span className="text-gold-400">VIP Access?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Submit a confidential enquiry. Our senior concierge team will respond within 24 hours
            with a personalized access strategy - no commitment, no pressure, absolute discretion.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking?restricted=true"
              className="group inline-flex items-center gap-2 rounded-lg bg-gold-400 px-10 py-4 text-lg font-bold text-black transition hover:bg-gold-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Book a Private Consultation
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-lg border border-dark-border bg-dark-800/60 px-8 py-4 text-sm font-medium text-gray-300 transition hover:border-gold-400/30 hover:text-white"
            >
              Browse All Packages
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            All enquiries handled encrypted. No identifying information shared externally.
          </p>
        </div>
      </section>

    </div>
  )
}
