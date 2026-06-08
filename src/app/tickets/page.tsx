import { packages, packageSvgPath } from '@/lib/data'
import Link from 'next/link'
import PackageCard from '@/components/PackageCard'

const FILTERS = [
  { key: 'all', label: 'All Matches' },
  { key: 'opening', label: 'Opening' },
  { key: 'group', label: 'Group Stage' },
  { key: 'r32', label: 'Round of 32' },
  { key: 'r16', label: 'Round of 16' },
  { key: 'qf', label: 'Quarter-Final' },
  { key: 'semifinal', label: 'Semi-Final' },
  { key: 'third_place', label: 'Third Place' },
  { key: 'final', label: 'Final' },
]

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const activeFilter = params.type || 'all'

  const filtered = activeFilter === 'all'
    ? packages
    : packages.filter((p) => p.match_type === activeFilter)

  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Can I buy FIFA 2026 VIP tickets if I'm from a country on FIFA's restricted list?",
                acceptedAnswer: { '@type': 'Answer', text: "Yes. FIFA's ticket restriction does not apply to hospitality packages sold through private vendors like Vantage 26. We handle our own verification and accept clients from all nationalities." },
              },
              {
                '@type': 'Question',
                name: 'Do you accept cryptocurrency for VIP packages?',
                acceptedAnswer: { '@type': 'Answer', text: 'Yes. We accept Bitcoin, Ethereum, and USDT. Crypto payments clear in minutes rather than the 3-5 business days required for international wire transfers.' },
              },
              {
                '@type': 'Question',
                name: "What's included in a VIP hospitality package?",
                acceptedAnswer: { '@type': 'Answer', text: "Packages range from $3,500 (Silver) to $120,000 (Chairman's Suite Final). Higher tiers include private jet transfers, Rolls-Royce pickup, personal butler, Michelin-star catering, and field-level pre-match access." },
              },
              {
                '@type': 'Question',
                name: 'How do I book a FIFA 2026 VIP package?',
                acceptedAnswer: { '@type': 'Answer', text: 'Browse packages on the tickets page, select your match and tier, then submit your enquiry. A concierge will contact you within 24 hours to finalize your booking and arrange payment.' },
              },
            ],
          }),
        }}
      />
      {packages.map((pkg) => {
        const svgUrl = `https://www.vantage26.com${packageSvgPath(pkg)}`
        return (
        <script
          key={pkg.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: pkg.name,
              description: pkg.description,
              image: [svgUrl],
              brand: {
                '@type': 'Brand',
                name: 'Vantage 26',
              },
              offers: {
                '@type': 'Offer',
                price: pkg.price_usd,
                priceCurrency: 'USD',
                availability: pkg.available > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
                url: 'https://www.vantage26.com/booking',
                hasMerchantReturnPolicy: {
                  '@type': 'MerchantReturnPolicy',
                  applicableCountry: 'US',
                  returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                },
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'US',
                  },
                  deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                      '@type': 'QuantitativeValue',
                      minValue: 0,
                      maxValue: 1,
                      unitCode: 'DAY',
                    },
                    transitTime: {
                      '@type': 'QuantitativeValue',
                      minValue: 0,
                      maxValue: 0,
                      unitCode: 'DAY',
                    },
                  },
                },
              },
            }),
          }}
        />)
      })}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              VIP <span className="text-gold-400">Hospitality Packages</span>
            </h2>
            <p className="mt-2 text-gray-400">Curated for the world&apos;s most discerning clientele</p>
          </div>

          {/* Filter tabs — URL-based, works without JS */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {FILTERS.map(({ key, label }) => {
              const isActive = key === activeFilter
              const href = key === 'all' ? '/tickets' : `/tickets?type=${key}`
              return isActive ? (
                <span
                  key={key}
                  className="inline-block rounded-full bg-gold-400 px-4 py-1.5 text-sm font-bold text-black"
                >
                  {label}
                </span>
              ) : (
                <Link
                  key={key}
                  href={href}
                  className="inline-block rounded-full border border-dark-border px-4 py-1.5 text-sm text-gray-400 transition hover:border-gold-400/50 hover:text-gold-400"
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
