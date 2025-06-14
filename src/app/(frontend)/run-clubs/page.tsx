import { Filters } from '@/components/filters/Filters'
import { getRunClubs } from '../(server)/queries/clubs'
import { ClubCard } from '@/components/ClubCard'
import { getCities } from '../(server)/queries/get-cities'

async function ClubsPage({ searchParams }: { searchParams: Promise<{ city: string }> }) {
  const { city } = await searchParams
  const citySlug = city === 'all' ? null : city

  const cities = await getCities()

  const clubs = await getRunClubs({ citySlug })

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          TOUS LES RUNNING CLUBS
        </h1>
      </div>

      <Filters cities={cities.docs} cityFilter={true} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clubs.docs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  )
}

export default ClubsPage
