'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  Bitcoin, Copy, CheckCircle, Send, ExternalLink, Shield, Check,
  ChevronDown, ChevronUp, Wallet, Clock, Zap, Loader2
} from 'lucide-react'
import { cryptoWallets, type CryptoWallet } from '@/lib/data'

interface CryptoPaymentFlowProps {
  pkg: {
    id: string
    name: string
    price_usd: number
    match_type: string
    venue_name: string
    match_date: string
  }
}

// ── helpers ────────────────────────────────────────────────

function getWalletUri(w: CryptoWallet): string {
  switch (w.id) {
    case 'btc': return `bitcoin:${w.address}`
    case 'evm': return `ethereum:${w.address}`
    case 'usdt': return w.address.startsWith('T') ? `tron:${w.address}` : w.address
    default: return w.address
  }
}

const NETWORK_COLORS: Record<string, string> = {
  btc: 'from-amber-500/20 to-amber-600/5',
  evm: 'from-blue-500/20 to-purple-600/5',
  usdt: 'from-green-500/20 to-green-600/5',
  bch: 'from-emerald-500/10 to-emerald-600/5',
  xrp: 'from-indigo-500/10 to-indigo-600/5',
  doge: 'from-yellow-500/10 to-yellow-600/5',
  ltc: 'from-slate-400/10 to-slate-500/5',
}

const NETWORK_BG: Record<string, string> = {
  btc: 'border-amber-500/40 hover:border-amber-500/70',
  evm: 'border-blue-500/40 hover:border-blue-500/70',
  usdt: 'border-green-500/40 hover:border-green-500/70',
  bch: 'border-emerald-500/30 hover:border-emerald-500/50',
  xrp: 'border-indigo-500/30 hover:border-indigo-500/50',
  doge: 'border-yellow-500/30 hover:border-yellow-500/50',
  ltc: 'border-slate-400/30 hover:border-slate-400/50',
}

export default function CryptoPaymentFlow({ pkg }: CryptoPaymentFlowProps) {
  const [step, setStep] = useState<'idle' | 'payment' | 'sent'>('idle')
  const [selected, setSelected] = useState<CryptoWallet | null>(null)
  const [copied, setCopied] = useState(false)

  // BTC rate
  const [btcRate, setBtcRate] = useState<number | null>(null)
  const [btcLoading, setBtcLoading] = useState(false)
  const [btcError, setBtcError] = useState(false)

  // Auto-detect
  const [checking, setChecking] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [checkError, setCheckError] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeRef = useRef(false)

  // Secondary wallets visibility
  const [showMore, setShowMore] = useState(false)
  // EVM chain details
  const [showEVM, setShowEVM] = useState(false)

  const featured = cryptoWallets.filter(w => w.priority === 'featured')
  const secondary = cryptoWallets.filter(w => w.priority === 'secondary')

  // ── BTC rate fetch ──────────────────────────────────────
  useEffect(() => {
    if (step !== 'payment' || selected?.id !== 'btc') return
    let dead = false
    setBtcLoading(true)
    setBtcError(false)
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(r => r.json())
      .then(d => { if (!dead) { setBtcRate(d?.bitcoin?.usd ?? null); setBtcLoading(false) }})
      .catch(() => { if (!dead) { setBtcError(true); setBtcLoading(false) }})
    return () => { dead = true }
  }, [step, selected?.id])

  // ── Polling for payment confirmation ─────────────────────
  const startPolling = useCallback(() => {
    if (!selected || confirmed) return
    activeRef.current = true

    const check = async () => {
      if (!activeRef.current || !selected) return
      setChecking(true)
      try {
        const res = await fetch(`/api/check-payment?wallet=${selected.id}&tx=1`)
        const data = await res.json()
        if (data.confirmed) {
          setConfirmed(true)
          activeRef.current = false
          if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
        }
        setCheckError(false)
      } catch {
        setCheckError(true)
      }
      setChecking(false)
    }

    // First check immediately
    check()
    // Then poll every 30s
    pollRef.current = setInterval(check, 30_000)
  }, [selected, confirmed])

  const stopPolling = useCallback(() => {
    activeRef.current = false
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null }
  }, [])

  // Start/stop polling on step change
  useEffect(() => {
    if (step === 'payment' && selected) {
      startPolling()
    } else {
      stopPolling()
    }
    return stopPolling
  }, [step, selected, startPolling, stopPolling])

  // Stop on tab blur
  useEffect(() => {
    const handle = () => {
      if (document.hidden) stopPolling()
      else if (step === 'payment' && selected && !confirmed) startPolling()
    }
    document.addEventListener('visibilitychange', handle)
    return () => document.removeEventListener('visibilitychange', handle)
  }, [step, selected, confirmed, startPolling, stopPolling])

  const handleSelect = useCallback((w: CryptoWallet) => {
    setSelected(w)
    setConfirmed(false)
    setCheckError(false)
    setStep('payment')
  }, [])

  const handleCopy = useCallback(async () => {
    if (!selected) return
    try {
      await navigator.clipboard.writeText(selected.address)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = selected.address
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [selected])

  // ── STEP: idle (wallet selection) ──────────────────────
  if (step === 'idle') {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="rounded-xl border border-dark-border bg-dark-900/60 p-5">
          <h3 className="mb-1 flex items-center gap-2 text-lg font-semibold text-white">
            <Wallet className="h-5 w-5 text-gold-400" /> Crypto Payment
          </h3>
          <p className="text-sm text-gray-500">Select your preferred network to continue</p>
        </div>

        {/* Featured wallets — large gold cards */}
        <div className="grid gap-3">
          {featured.map(w => (
            <button
              key={w.id}
              onClick={() => handleSelect(w)}
              className={`group relative overflow-hidden rounded-xl border bg-dark-900/60 p-4 text-left transition-all ${NETWORK_BG[w.id]} hover:shadow-lg hover:shadow-gold-400/5`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${NETWORK_COLORS[w.id]} text-xl`}>
                  {w.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{w.name}</span>
                    <span className="rounded-md bg-gold-400/10 px-1.5 py-0.5 text-[10px] font-medium uppercase text-gold-400">Popular</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">{w.address.slice(0, 20)}...{w.address.slice(-6)}</p>
                  {w.evmChains && (
                    <p className="mt-0.5 text-[10px] text-gray-600">{w.evmChains.length} chains · 1 address</p>
                  )}
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600 transition group-hover:text-gold-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Secondary wallets — compact expandable */}
        <div className="rounded-xl border border-dark-border bg-dark-900/60 p-3">
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex w-full items-center justify-between text-sm text-gray-400 transition hover:text-gold-400"
          >
            <span>More networks ({secondary.length})</span>
            {showMore ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showMore && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {secondary.map(w => (
                <button
                  key={w.id}
                  onClick={() => handleSelect(w)}
                  className={`flex items-center gap-2 rounded-lg border bg-dark-800/50 p-2.5 text-left text-xs transition ${NETWORK_BG[w.id]}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm">
                    {w.symbol}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white">{w.shortName}</div>
                    <div className="truncate text-[10px] text-gray-600">{w.address.slice(0, 12)}...</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* trust badges */}
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-400" /> No KYC</span>
          <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-400" /> Encrypted</span>
          <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-400" /> OTC desk available</span>
        </div>
      </div>
    )
  }

  // ── STEP: sent / confirmed ─────────────────────────────
  if (step === 'sent' || confirmed) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="relative">
          <CheckCircle className="h-16 w-16 text-green-400" />
          <div className="absolute -inset-4 animate-ping rounded-full border border-green-400 opacity-20" />
        </div>
        <h3 className="text-2xl font-bold text-white">Payment Confirmed</h3>
        <p className="max-w-md text-gray-400">
          {confirmed
            ? 'Your transaction has been detected on-chain. Our concierge will contact you within 24 hours.'
            : 'Thank you. Our concierge team will contact you within 24 hours to finalize your booking.'}
        </p>
        <div className="mt-2 rounded-lg border border-dark-border bg-dark-800/50 px-4 py-2 text-xs text-gray-500">
          {selected && (
            <>Transaction on <span className="text-gold-400">{selected.shortName}</span></>
          )}
        </div>
      </div>
    )
  }

  // ── STEP: payment (show QR + address + listener) ───────
  const wallet = selected!
  const uri = getWalletUri(wallet)
  const btcAmount = btcRate ? pkg.price_usd / btcRate : null

  return (
    <div className="space-y-4">
      {/* Back */}
      <button
        onClick={() => { setStep('idle'); setConfirmed(false); stopPolling() }}
        className="flex items-center gap-1 text-xs text-gray-500 transition hover:text-gold-400"
      >
        ← Change network
      </button>

      {/* Payment card */}
      <div className="rounded-xl border border-gold-400/20 bg-dark-900/60 p-5 text-center">
        {/* Network badge */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${NETWORK_COLORS[wallet.id]} text-sm`}>
            {wallet.symbol}
          </div>
          <span className="text-sm font-semibold text-white">{wallet.shortName}</span>
        </div>

        {/* EVM chain detail */}
        {wallet.evmChains && (
          <div className="mb-3">
            <button
              onClick={() => setShowEVM(!showEVM)}
              className="inline-flex items-center gap-1 text-[10px] text-gray-500 transition hover:text-gold-400"
            >
              1 address · {wallet.evmChains.length} chains {showEVM ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            {showEVM && (
              <div className="mt-1 flex flex-wrap justify-center gap-1.5">
                {wallet.evmChains.map(c => (
                  <span key={c} className="rounded-full bg-dark-700 px-2 py-0.5 text-[10px] text-gray-400">{c}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Package info */}
        <p className="text-xs text-gray-500">{pkg.venue_name} · {pkg.match_date}</p>
        <p className="mt-1 font-semibold text-white">{pkg.name}</p>
        <p className="mt-1 text-2xl font-bold text-gold-400">${pkg.price_usd.toLocaleString()}</p>

        {/* BTC Amount */}
        {wallet.id === 'btc' && btcLoading && (
          <div className="mx-auto mb-3 mt-3 flex max-w-[260px] items-center justify-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2">
            <Loader2 className="h-3 w-3 animate-spin text-amber-400" />
            <span className="text-xs text-gray-400">Fetching rate...</span>
          </div>
        )}
        {wallet.id === 'btc' && btcError && (
          <div className="mx-auto mb-3 mt-3 max-w-[260px] rounded-lg border border-red-400/20 bg-red-900/10 p-2 text-xs text-red-400">
            Rate unavailable. Send equivalent of ${pkg.price_usd.toLocaleString()}.
          </div>
        )}
        {wallet.id === 'btc' && btcAmount && !btcLoading && (
          <div className="mx-auto mb-3 mt-3 max-w-[260px] rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-dark-900/80 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">Send Exactly</p>
            <p className="text-lg font-bold text-amber-400">{btcAmount.toFixed(6)} BTC</p>
            <p className="text-[10px] text-gray-600">≈ {Math.round(btcAmount * 100_000_000).toLocaleString()} sats</p>
          </div>
        )}

        {/* QR Code */}
        <div className="mb-3 flex justify-center">
          <div className="inline-block rounded-xl bg-white p-3 shadow-lg shadow-gold-400/5">
            <QRCodeSVG value={uri} size={180} level="H" />
          </div>
        </div>

        {/* Address + Copy */}
        <div className="mx-auto mb-3 flex max-w-sm items-center gap-2 rounded-lg border border-dark-border bg-dark-800 px-3 py-2.5">
          <code className="flex-1 break-all text-[11px] text-gray-300 leading-tight">{wallet.address}</code>
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1 rounded-md bg-dark-700 px-2.5 py-1.5 text-[11px] text-gray-300 transition hover:bg-dark-border hover:text-white"
          >
            {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        {/* Explorer link */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-500">
          <ExternalLink className="h-3 w-3" />
          <a
            href={`${wallet.explorerUrl}${wallet.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition hover:text-gold-400"
          >
            View on {wallet.shortName} explorer
          </a>
        </div>
      </div>

      {/* ── Auto-detect panel ───────────────────────────── */}
      <div className={`rounded-xl border p-4 text-center transition ${
        confirmed
          ? 'border-green-500/40 bg-green-500/5'
          : 'border-dark-border bg-dark-900/60'
      }`}>
        {confirmed ? (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <p className="text-lg font-bold text-white">Transaction Confirmed</p>
            <p className="text-xs text-gray-400">Your reservation is being processed</p>
            <button
              onClick={() => setStep('sent')}
              className="mt-2 rounded-lg bg-gold-400 px-6 py-2 text-sm font-bold text-black transition hover:bg-gold-300"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
              </span>
              <span className="text-sm font-medium text-white">Listening for payment...</span>
            </div>
            <p className="text-xs text-gray-500">
              Send {wallet.shortName} to the address above. This page auto-detects the transaction.
            </p>
            {checking && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <Loader2 className="h-3 w-3 animate-spin" /> Checking network
              </p>
            )}
            {checkError && (
              <p className="mt-2 text-[11px] text-red-400">
                Connection issue — will retry automatically
              </p>
            )}
            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-gray-600">
              <Clock className="h-3 w-3" />
              <span>Auto-checks every 30s</span>
              <Zap className="h-3 w-3" />
              <span>Pauses when tab is inactive</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
