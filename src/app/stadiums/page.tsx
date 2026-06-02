import StadiumSelector from '@/components/StadiumSelector'

export default function StadiumsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">
            Interactive <span className="text-gold-400">Seat Selection</span>
          </h1>
          <p className="mt-2 text-gray-400">Explore stadiums, preview sections, and select your perfect seat</p>
        </div>
        <StadiumSelector />
      </div>
    </div>
  )
}
