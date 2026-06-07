'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', interest: '', message: '', crypto: [] as string[] })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          btc: form.crypto.includes('BTC'),
          eth: form.crypto.includes('ETH'),
          usdt: form.crypto.includes('USDT'),
          fingerprint: sessionStorage.getItem('v26_fp') || null,
          device: (() => {
            try {
              const raw = sessionStorage.getItem('v26_device')
              return raw ? JSON.parse(raw) : null
            } catch {
              return null
            }
          })(),
        }),
      })
      setSent(true)
    } catch {
      alert('Failed to send. Please email us directly.')
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-gold-400" />
        <h3 className="text-2xl font-bold text-white">Enquiry Received</h3>
        <p className="text-gray-400">Our concierge team will contact you within 24 hours via encrypted channel.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-400">Name *</label>
          <input required className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Email *</label>
          <input required type="email" className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Phone</label>
          <input className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-400">Country</label>
          <input className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Interest</label>
        <select className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
          <option value="">Select...</option>
          <option value="tickets">Tickets</option>
          <option value="vip_package">VIP Package</option>
          <option value="jet">Private Jet</option>
          <option value="rolls_royce">Rolls Royce</option>
          <option value="full_concierge">Full Concierge</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Preferred Crypto</label>
        <div className="flex gap-3">
          {['BTC', 'ETH', 'USDT'].map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={form.crypto.includes(c)}
                onChange={() => setForm({ ...form, crypto: form.crypto.includes(c) ? form.crypto.filter((x) => x !== c) : [...form.crypto, c] })}
                className="accent-gold-400"
              />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-gray-400">Message *</label>
        <textarea required rows={4} className="w-full rounded-lg border border-dark-border bg-dark-800 px-4 py-2.5 text-white outline-none focus:border-gold-400" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3 font-bold text-black transition hover:bg-gold-300 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Enquiry'} <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
