'use server'

import { payload } from '../client'

export async function getRuns({
  startDate,
  endDate,
  citySlug,
  distance,
}: {
  startDate: Date | null
  endDate: Date | null
  citySlug: string | null
  distance: number | null
}) {
  console.log('🚀 ~ distance:', distance)
  const endDatePlusOne = endDate && new Date(endDate.setDate(endDate.getDate() + 1))
  const events = await payload.find({
    collection: 'run',
    sort: 'date',
    where: {
      date: {
        ...(startDate && { greater_than_equal: startDate.toISOString() }),
        ...(endDatePlusOne && { less_than_equal: endDatePlusOne.toISOString() }),
      },
      ...(citySlug && { ['city.slug']: { equals: citySlug } }),
      ...(distance && { distance: { less_than_equal: distance } }),
    },
  })
  return events
}
