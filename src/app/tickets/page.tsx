import PackageGrid from '@/components/PackageGrid'
import { packages } from '@/lib/data'

export default function TicketsPage() {
  return (
    <div className="min-h-screen">
      {packages.map((pkg) => (
        <script key={pkg.id} type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: pkg.name,
              description: pkg.description,
              offers: {
                '@type': 'Offer',
                price: pkg.price_usd,
                priceCurrency: 'USD',
                availability: pkg.available > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
                url: 'https://vantage26.com/booking',
              },
            }),
          }}
        />
      ))}
      <PackageGrid />
    </div>
  )
}
