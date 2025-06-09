import { RunCard } from '@/components/RunCard'
import { getRuns } from './server/queries/get-events'
import { getCities } from './server/queries/get-cities'
import { CitiesFilterButton } from '@/components/CitiesFilterButton'
import { useState } from 'react'
import { Filters } from '@/components/Filters'

async function Home() {
  const runs = await getRuns()
  const cities = await getCities()
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">TOUS LES RUNS</h1>
      </div>

      {/* <EventFilters filters={filters} onFilterChange={handleFilterChange} /> */}
      <Filters cities={cities.docs} />
      {/* <CitiesFilterButton cities={cities.docs} /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {runs.docs.map((run) => (
          <RunCard key={run.id} run={run} />
        ))}
      </div>

      {/* {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun événement ne correspond à vos critères de recherche.
          </p>
        </div>
      )} */}
    </>
  )
}

export default Home
