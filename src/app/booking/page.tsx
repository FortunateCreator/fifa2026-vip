import { packages } from '@/lib/data'
import BookingClient from './BookingClient'
import { redirect } from 'next/navigation'

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>
}) {
  const params = await searchParams
  const pkg = packages.find((p) => p.id === params.package)

  // If no package specified, redirect to tickets page
  if (!pkg) {
    redirect('/tickets')
  }

  return (
    <div className="min-h-screen py-20">
      <BookingClient initialPkg={pkg} />
    </div>
  )
}
