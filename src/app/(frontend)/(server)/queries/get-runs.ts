'use server'

import { Run } from '@/payload-types'
import { payload } from '../client'

export async function getRuns({
  startDate,
  endDate,
  citySlug,
  distance,
  type,
  userId,
  futureRunsOnly = true,
}: {
  startDate?: Date | null
  endDate?: Date | null
  citySlug?: string | null
  distance?: Run['distance']
  type?: Run['type'] | null
  userId?: string | null
  futureRunsOnly?: boolean
}) {
  const endDatePlusOne = endDate && new Date(endDate.setDate(endDate.getDate() + 1))
  const events = await payload.find({
    collection: 'run',
    sort: 'date',
    where: {
      date: {
        ...(startDate && { greater_than_equal: startDate.toISOString() }),
        ...(endDatePlusOne && { less_than_equal: endDatePlusOne.toISOString() }),
        ...(futureRunsOnly && { greater_than_equal: new Date().toISOString() }),
      },
      ...(citySlug && { ['city.slug']: { equals: citySlug } }),
      ...(distance && { distance: { less_than_equal: distance } }),
      ...(type && { type: { equals: type } }),
      ...(userId && { participants: { contains: userId } }),
    },
  })
  return events
}
