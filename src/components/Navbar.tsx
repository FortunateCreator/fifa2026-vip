'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plane, Crown, ShieldCheck, Shield } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/matches', label: 'Matches' },
    { href: '/stadiums', label: 'Stadiums' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Insider' },
    { href: '/restricted-access', label: 'Restricted Access', highlighted: true },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-dark-border bg-dark-950/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-gold-400" />
          <span className="text-lg font-bold tracking-wider text-white">
            FIFA <span className="text-gold-400">26</span> VIP
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm tracking-wide transition ${l.highlighted ? 'text-gold-400 hover:text-gold-300' : 'text-gray-400 hover:text-gold-400'}`}>
              {l.highlighted && <Shield className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />}{l.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="rounded-md bg-gold-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-gold-300"
          >
            Book VIP
          </Link>
        </div>
        <button className="text-white md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-dark-border bg-dark-900 px-4 py-4 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block py-2 transition ${l.highlighted ? 'font-semibold text-gold-400' : 'text-gray-300 hover:text-gold-400'}`}>
              {l.highlighted && <Shield className="-mt-0.5 mr-1 inline h-3.5 w-3.5" />}{l.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)} className="mt-2 inline-block rounded bg-gold-400 px-4 py-2 text-sm font-bold text-black">
            Book VIP
          </Link>
        </div>
      )}
    </nav>
  )
}
