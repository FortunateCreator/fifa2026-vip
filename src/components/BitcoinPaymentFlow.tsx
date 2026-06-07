'use client'

import { useState, useCallback, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Bitcoin, Copy, CheckCircle, Send, ExternalLink, Shield, Check } from 'lucide-react'

const BTC_ADDRESS = 'bc1qsma38ulsfdttz68ay53pjmk7rg3pt30q9ej99z'

interface BitcoinPaymentFlowProps {
  pkg: {
    id: string
    name: string
    price_usd: number
    match_type: string
    venue_name: string
    match_date: string
  }
}

export default function BitcoinPaymentFlow({ pkg }: BitcoinPaymentFlowProps) {
  const [step, setStep] = useState<'idle' | 'payment' | 'sent'>('idle')
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [timezone, setTimezone] = useState('')
  const [preferredSlot, setPreferredSlot] = useState('')

  const TIME_SLOTS = [
    { id: 'morning', label: 'Morning (9:00 AM – 12:00 PM)' },
    { id: 'afternoon', label: 'Afternoon (12:00 PM – 3:00 PM)' },
    { id: 'evening', label: 'Evening (3:00 PM – 6:00 PM)' },
    { id: 'anytime', label: "Anytime — I'm flexible" },
  ] as const

  // BTC exchange rate
  const [btcRate, setBtcRate] = useState<number | null>(null)
  const [btcLoading, setBtcLoading] = useState(false)
  const [btcError, setBtcError] = useState(false)

  useEffect(() => {
    if (step !== 'payment') return

    let cancelled = false
    setBtcLoading(true)
    setBtcError(false)
    setBtcRate(null)

    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          const rate = data?.bitcoin?.usd
          if (typeof rate !== 'number') throw new Error('Invalid rate response')
          setBtcRate(rate)
          setBtcLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBtcError(true)
          setBtcLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [step])

  // Auto-detect user timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
      setTimezone(tz)
    } catch {
      setTimezone('UTC')
    }
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(BTC_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = BTC_ADDRESS
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        email: form.email,
        interest: `VIP Package - ${pkg.name}`,
        message: form.message
          ? `${form.message}\n\nPayment sent via Bitcoin. Package: ${pkg.name}. Amount: $${pkg.price_usd.toLocaleString()}`
          : `Payment sent via Bitcoin. Package: ${pkg.name}. Amount: $${pkg.price_usd.toLocaleString()}`,
        btc: true,
        eth: false,
        usdt: false,
        payment_method: 'bitcoin',
        payment_address: BTC_ADDRESS,
        preferred_contact_time: preferredSlot
          ? `${TIME_SLOTS.find(s => s.id === preferredSlot)?.label} ${timezone}`
          : `Anytime ${timezone}`,
      }
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStep('sent')
    } catch {
      alert('Failed to submit. Please try again or contact us directly.')
    }
    setLoading(false)
  }

  if (step === 'sent') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-gold-400" />
        <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
        <p className="max-w-md text-gray-400">
          Thank you for your Bitcoin payment submission. Our concierge team will contact you
          within 24 hours via encrypted channel to confirm your booking.
        </p>
      </div>
    )
  }

  if (step === 'idle') {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-dark-border bg-dark-900/60 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Bitcoin className="h-5 w-5 text-gold-400" /> Crypto Payment
          </h3>
          <ul className="mb-6 space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> BTC, ETH, USDT (ERC-20/TRC-20) accepted</li>
            <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> Discreet OTC desk for large transactions</li>
            <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> Encrypted communication via Signal/Wickr</li>
            <li className="flex items-start gap-2"><Shield className="mt-0.5 h-4 w-4 text-green-400" /> No KYC required for crypto whale packages</li>
          </ul>
          <button
            onClick={() => setStep('payment')}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3 font-bold text-black transition hover:bg-gold-300"
          >
            <Bitcoin className="h-4 w-4" /> Buy with Bitcoin
          </button>
        </div>
      </div>
    )
  }

  // Payment step — show QR + address + form
  const btcUri = `bitcoin:${BTC_ADDRESS}`

  return (
    <div className="space-y-6">
      {/* Hero QR + Address section */}
      <div className="rounded-xl border border-gold-400/30 bg-dark-900/60 p-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Bitcoin className="h-6 w-6 text-gold-400" />
          <span className="text-xl font-bold text-white">Bitcoin Payment</span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-400">{pkg.venue_name} &middot; {pkg.match_date}</p>
          <p className="mt-1 text-lg font-semibold text-white">{pkg.name}</p>
          <p className="mt-1 text-3xl font-bold text-gold-400">${pkg.price_usd.toLocaleString()}</p>
        </div>

        {/* BTC Amount Card — prominently shows exact amount to send */}
        {btcLoading && (
          <div className="mb-4 rounded-xl border border-gold-400/40 bg-gradient-to-br from-gold-400/10 to-dark-900/80 p-4 text-center">
            <p className="text-sm text-gray-400">Fetching current BTC rate...</p>
          </div>
        )}
        {btcError && (
          <div className="mb-4 rounded-xl border border-red-400/30 bg-red-900/20 p-4 text-center">
            <p className="text-sm text-red-400">Unable to fetch BTC rate. Please refresh and try again.</p>
          </div>
        )}
        {btcRate !== null && !btcLoading && !btcError && (() => {
          const btcAmount = pkg.price_usd / btcRate
          const satoshiAmount = Math.round(btcAmount * 100_000_000)
          return (
            <div className="mb-4 rounded-xl border border-gold-400/40 bg-gradient-to-br from-gold-400/10 to-dark-900/80 p-4 text-center shadow-lg shadow-gold-400/5">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Send Exactly</p>
              <p className="text-2xl font-bold text-gold-400">{btcAmount.toFixed(4)} BTC</p>
              <p className="text-sm text-gray-500">≈ {satoshiAmount.toLocaleString()} sats</p>
              <p className="mt-1 text-xs text-gray-600">≈ ${pkg.price_usd.toLocaleString()} USD</p>
            </div>
          )
        })()}

        {/* QR Code */}
        <div className="mb-4 flex justify-center">
          <div className="inline-block rounded-xl bg-white p-4 shadow-lg shadow-gold-400/10">
            <QRCodeSVG value={btcUri} size={200} level="H" />
          </div>
        </div>

        <p className="mb-3 text-sm text-gray-500">
          Send exactly <span className="font-bold text-white">{btcRate ? `${(pkg.price_usd / btcRate).toFixed(4)} BTC` : `$${pkg.price_usd.toLocaleString()} USD worth of BTC`}</span> to the address below. Double-check the amount before confirming.
        </p>

        {/* Address + Copy */}
        <div className="mx-auto mb-4 flex max-w-md items-center gap-2 rounded-lg border border-dark-border bg-dark-800 px-4 py-3">
          <code className="flex-1 break-all text-xs text-gray-300">{BTC_ADDRESS}</code>
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-md bg-dark-700 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-dark-border hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <ExternalLink className="h-3 w-3" />
          <a
            href={`https://www.blockchain.com/explorer/address/btc/${BTC_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-gold-400"
          >
            View on blockchain explorer
          </a>
        </div>
      </div>

      {/* Compact Form - Name + Email + Optional Message */}
      <div className="rounded-xl border border-dark-border bg-dark-900/60 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
          <Send className="h-4 w-4 text-gold-400" /> Your Details
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-gray-400">Name *</label>
              <input
                required
                className="w-full rounded-lg border border-dark-border bg-dark-800 px-3 py-2 text-sm text-white outline-none transition focus:border-gold-400"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-400">Email *</label>
              <input
                required
                type="email"
                className="w-full rounded-lg border border-dark-border bg-dark-800 px-3 py-2 text-sm text-white outline-none transition focus:border-gold-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-gray-400">Special requests (optional)</label>
            <textarea
              rows={2}
              className="w-full rounded-lg border border-dark-border bg-dark-800 px-3 py-2 text-sm text-white outline-none transition focus:border-gold-400"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* Preferred Contact Time — intelligent timezone-aware scheduling */}
          <div>
            <label className="mb-2 block text-xs text-gray-400">
              Preferred Contact Time
            </label>
            {timezone && (
              <p className="mb-2 text-xs text-gold-400">
                🕐 Your timezone detected: {timezone}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setPreferredSlot(slot.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    preferredSlot === slot.id
                      ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                      : 'border-dark-border bg-dark-800 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            {preferredSlot && preferredSlot !== 'anytime' && timezone && (
              <p className="mt-1.5 text-xs text-gray-500">
                Our concierge will call you between{' '}
                {TIME_SLOTS.find(s => s.id === preferredSlot)?.label.replace(/\(|\)/g, '')} {timezone}
              </p>
            )}
            {preferredSlot === 'anytime' && (
              <p className="mt-1.5 text-xs text-gray-500">
                Our concierge will reach out at a time that works best for you.
              </p>
            )}
          </div>

          {/* Concierge security note */}
          <div className="rounded-lg border border-dark-border bg-dark-800/50 px-3 py-2.5">
            <p className="text-xs leading-relaxed text-gray-400">
              🛡️ A dedicated concierge will contact you within 24 hours via encrypted channel to confirm your booking and arrange the experience.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-400 px-4 py-2.5 text-sm font-bold text-black transition hover:bg-gold-300 disabled:opacity-50"
          >
            {loading ? (
              <>Submitting...</>
            ) : (
              <>
                Confirm Payment & Schedule Contact <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
