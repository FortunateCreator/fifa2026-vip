import Hero from '@/components/Hero'
import PackageGrid from '@/components/PackageGrid'
import ServicesSection from '@/components/ServicesSection'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <>
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
