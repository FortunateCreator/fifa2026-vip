import StadiumSelector from '@/components/StadiumSelector'
import { venues } from '@/lib/data'

const countryFlags: Record<string, string> = {
  USA: '🇺🇸',
  Mexico: '🇲🇽',
  Canada: '🇨🇦',
}

const countryOrder = ['USA', 'Mexico', 'Canada']

export default function StadiumsPage() {
  const grouped = countryOrder.map((country) => ({
    country,
    flag: countryFlags[country],
    venues: venues.filter((v) => v.country === country),
  }))

  return (
    <div className="min-h-screen py-20">
      {venues.map((v) => (
        <script key={v.id} type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'StadiumOrArena',
              name: v.name,
              containedInPlace: {
                '@type': 'City',
                name: v.city,
                address: { '@type': 'PostalAddress', addressCountry: v.country },
              },
              capacity: v.capacity,
              url: 'https://vantage26.com/stadiums',
            }),
          }}
        />
      ))}
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">
            Interactive <span className="text-gold-400">Seat Selection</span>
          </h1>
          <p className="mt-2 text-gray-400">Explore stadiums, preview sections, and select your perfect seat</p>
        </div>
        <StadiumSelector />

        {/* All 16 venues grouped by country */}
        <div className="mt-20">
          <h2 className="mb-8 text-3xl font-bold text-white">
            All <span className="text-gold-400">16 Venues</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {grouped.map((g) => (
              <div key={g.country}>
                <h3 className="mb-4 text-xl font-bold text-white">
                  {g.flag} {g.country}
                  <span className="ml-2 text-sm font-normal text-gray-500">({g.venues.length} stadiums)</span>
                </h3>
                <div className="space-y-3">
                  {g.venues.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-xl border border-dark-border bg-dark-900/60 p-4 transition hover:border-gold-400/30"
                    >
                      <div className="mb-1 flex items-start justify-between">
                        <h4 className="font-semibold text-white">{v.name}</h4>
                        <span className="whitespace-nowrap text-sm font-bold text-gold-400">
                          {v.capacity.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{v.city}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
