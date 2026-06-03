import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vantage 26 — FIFA 2026 VIP Hospitality & Ticket Concierge',
  description: 'Private jet charters, Rolls Royce transfers, presidential suites for HNWI clients. Crypto payments accepted. Vantage 26 — the ultimate FIFA World Cup 2026 experience.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              { '@type': 'Organization', name: 'Vantage 26', url: 'https://vantage26.com', logo: 'https://vantage26.com/logo.png', description: 'FIFA 2026 VIP hospitality concierge. Private jets, Rolls Royce transfers, presidential suites for HNWI clients.', sameAs: [] },
              { '@type': 'WebSite', name: 'Vantage 26', url: 'https://vantage26.com', description: 'FIFA 2026 VIP Hospitality & Ticket Concierge', potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: 'https://vantage26.com/search?q={search_term_string}' }, 'query-input': 'required name=search_term_string' } },
            ],
          }),
        }} />
        <Navbar />
        <main className="pt-16">{children}</main>
        <footer className="border-t border-dark-border py-8 text-center text-sm text-gray-600">
          <div className="mx-auto max-w-7xl px-4">
            <p>FIFA 2026 VIP Concierge — Independent luxury hospitality provider. Not affiliated with FIFA.</p>
            <p className="mt-1">All transactions secured via encrypted channels. Crypto accepted worldwide.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
