'use client'

import Link from 'next/link'
import { Crown } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Crown className="h-5 w-5 text-gold-400" />
              <span className="text-base font-bold tracking-wider text-white">
                FIFA <span className="text-gold-400">26</span> VIP
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-500">
              Independent luxury hospitality concierge for the FIFA World Cup 2026. Private jets,
              Rolls Royce transfers, and presidential suites for HNWI clients.
            </p>
          </div>

          {/* Legal Links */}
          <div className="md:text-right">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 transition hover:text-gold-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 transition hover:text-gold-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-sm text-gray-400 transition hover:text-gold-400"
                >
                  Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-dark-border pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2026 Vantage 26. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-700">
            Not affiliated with FIFA. All trademarks are the property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
