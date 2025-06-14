'use client'

import { City } from '@/payload-types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { DateFilter } from './DateFilter'
import { CityFilter } from './CityFilter'
import { DistanceFilter } from './DistanceFilter'
import { TypeFilter } from './TypeFilter'

export function Filters({
  cities,
  dateFilter,
  cityFilter,
  distanceFilter,
  typeFilter,
}: {
  cities: City[]
  dateFilter?: boolean
  cityFilter?: boolean
  distanceFilter?: boolean
  typeFilter?: boolean
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(terms: Record<string, string>) {
    const params = new URLSearchParams(searchParams)
    Object.entries(terms).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {dateFilter && <DateFilter handleSearch={handleSearch} />}

      {cityFilter && (
        <CityFilter cities={cities} handleSearch={handleSearch} searchParams={searchParams} />
      )}

      {distanceFilter && <DistanceFilter handleSearch={handleSearch} />}

      {typeFilter && <TypeFilter handleSearch={handleSearch} />}
    </div>
  )
}
