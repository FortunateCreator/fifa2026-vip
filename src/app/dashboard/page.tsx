import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSession, getUserPurchases } from '@/lib/db'
import Link from 'next/link'
import { Crown, Calendar, Wallet, Hash, ArrowLeft, LogOut, Package, DollarSign } from 'lucide-react'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')?.value

  if (!sessionId) {
    redirect('/login')
  }

  const session = getSession(sessionId)
  if (!session) {
    redirect('/login')
  }

  const purchases = getUserPurchases(session.user_id)

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-400/5 via-transparent to-transparent" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-dark-border bg-dark-950/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-gold-400" />
            <span className="text-sm font-bold tracking-wider text-white">
              FIFA <span className="text-gold-400">26</span> VIP
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gold-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Site
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-lg border border-dark-border px-4 py-2 text-sm text-gray-400 transition hover:border-red-500/30 hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12">
        {/* Welcome section */}
        <div className="mb-10">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gold-400">
            <Crown className="h-3.5 w-3.5" />
            <span>Client Dashboard</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome,{' '}
            <span className="text-gold-400">{session.name}</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">{session.email}</p>
        </div>

        {/* Profile card */}
        <div className="mb-10 rounded-2xl border border-dark-border bg-dark-800/60 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Account Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-dark-border bg-dark-900/60 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </p>
              <p className="mt-1 font-semibold text-white">{session.name}</p>
            </div>
            <div className="rounded-xl border border-dark-border bg-dark-900/60 px-5 py-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </p>
              <p className="mt-1 font-semibold text-white">{session.email}</p>
            </div>
          </div>
        </div>

        {/* Purchases section */}
        <div className="rounded-2xl border border-dark-border bg-dark-800/60 p-6 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Your Purchases
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                {purchases.length === 0
                  ? 'No purchases yet'
                  : `${purchases.length} purchase${purchases.length === 1 ? '' : 's'}`}
              </p>
            </div>
            {purchases.length === 0 && (
              <Link
                href="/tickets"
                className="flex items-center gap-1.5 rounded-lg bg-gold-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-gold-300"
              >
                Browse Packages
                <Package className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {purchases.length === 0 ? (
            <div className="rounded-xl border border-dashed border-dark-border py-16 text-center">
              <Package className="mx-auto mb-3 h-10 w-10 text-gray-600" />
              <p className="text-sm text-gray-500">
                You haven&apos;t purchased any packages yet.
              </p>
              <p className="mt-1 text-xs text-gray-600">
                Browse our exclusive VIP hospitality packages to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="group rounded-xl border border-dark-border bg-dark-900/60 p-5 transition hover:border-gold-400/20 hover:bg-dark-900/80"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white group-hover:text-gold-400 transition-colors">
                        {purchase.package_name}
                      </h3>
                      <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <DollarSign className="h-3.5 w-3.5 text-gold-400/60" />
                          <span className="font-medium text-gray-300">
                            {formatAmount(purchase.amount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Wallet className="h-3.5 w-3.5 text-gold-400/60" />
                          <span>{purchase.wallet_id.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="h-3.5 w-3.5 text-gold-400/60" />
                          <span>{formatDate(purchase.created_at)}</span>
                        </div>
                        {purchase.tx_id && (
                          <div className="flex items-center gap-2 text-gray-400">
                            <Hash className="h-3.5 w-3.5 text-gold-400/60" />
                            <code className="truncate rounded bg-dark-800 px-1.5 py-0.5 text-xs font-mono text-gray-500">
                              {purchase.tx_id.length > 24
                                ? purchase.tx_id.slice(0, 24) + '…'
                                : purchase.tx_id}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-gray-600">
          <p>Vantage 26 — FIFA World Cup 2026 VIP Hospitality</p>
        </div>
      </div>
    </div>
  )
}
