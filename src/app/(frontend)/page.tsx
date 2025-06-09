import { RunCard } from '@/components/RunCard'
import { getRuns } from './(server)/queries/get-runs'
import { getCities } from './(server)/queries/get-cities'
import { Filters } from '@/components/Filters'
import { Run } from '@/payload-types'
import { authClient } from '@/lib/auth-client'
import { headers } from 'next/headers'

async function Home({
  searchParams,
}: {
  searchParams: {
    startDate: string
    endDate: string
    city: string
    distance: string
    type: Run['type'] | 'all'
  }
}) {
  const { startDate, endDate, city, distance, type } = await searchParams
  const citySlug = city === 'all' ? null : city
  const distanceNumber = distance === 'all' ? null : Number(distance)
  const runs = await getRuns({
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    citySlug,
    distance: distanceNumber,
    type,
  })
  const cities = await getCities()

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">TOUS LES RUNS</h1>
      </div>

      <Filters cities={cities.docs} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {runs.docs.map((run) => (
          <RunCard key={run.id} run={run} />
        ))}
      </div>
    </div>
  )
}

export default Home
