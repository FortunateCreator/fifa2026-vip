import Hero from '@/components/Hero'
import PackageGrid from '@/components/PackageGrid'
import ServicesSection from '@/components/ServicesSection'
import ContactForm from '@/components/ContactForm'
import { packages } from '@/lib/data'

export default function Home() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FIFA 2026 VIP Hospitality Packages',
    description: 'Premium FIFA World Cup 2026 experiences — private jets, Rolls Royce, presidential suites',
    itemListElement: packages.map((pkg, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: pkg.name,
        description: pkg.description,
        offers: {
          '@type': 'Offer',
          price: pkg.price_usd,
          priceCurrency: 'USD',
          availability: pkg.available > 0 ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        },
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <Hero />
      <PackageGrid />
      <ServicesSection />
      <section id="contact" className="border-t border-dark-border py-20">
        <div className="mx-auto max-w-2xl px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Book Your <span className="text-gold-400">VIP Experience</span>
            </h2>
            <p className="mt-2 text-gray-400">
              Submit an enquiry and our concierge team will respond within 24 hours with a curated proposal.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
