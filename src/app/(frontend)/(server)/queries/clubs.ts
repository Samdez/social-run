import { payload } from '../client'

export async function getRunClubs({ citySlug }: { citySlug: string | null }) {
  const clubs = await payload.find({
    collection: 'run-club',
    where: {
      ...(citySlug && { ['city.slug']: { equals: citySlug } }),
    },
  })
  return clubs
}
