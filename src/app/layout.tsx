import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DeviceFingerprint from '@/components/DeviceFingerprint'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vantage 26 — FIFA 2026 VIP Hospitality & Ticket Concierge',
  description: 'Private jet charters, Rolls Royce transfers, presidential suites for HNWI clients. Crypto payments accepted. Vantage 26 — the ultimate FIFA World Cup 2026 experience.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <DeviceFingerprint />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              { '@type': 'Organization', name: 'Vantage 26', url: 'https://www.vantage26.com', logo: 'https://www.vantage26.com/favicon.svg', description: 'FIFA 2026 VIP hospitality concierge. Private jets, Rolls Royce transfers, presidential suites for HNWI clients.', sameAs: [] },
              { '@type': 'WebSite', name: 'Vantage 26', url: 'https://www.vantage26.com', description: 'FIFA 2026 VIP Hospitality & Ticket Concierge', potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://www.vantage26.com/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' } },
            ],
          }),
        }} />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
