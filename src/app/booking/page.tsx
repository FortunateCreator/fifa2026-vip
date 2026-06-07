import { packages } from '@/lib/data'
import BookingClient from './BookingClient'

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>
}) {
  const params = await searchParams
  const pkg = packages.find((p) => p.id === params.package) || null

  return (
    <div className="min-h-screen py-20">
      <BookingClient initialPkg={pkg} />
    </div>
  )
}
