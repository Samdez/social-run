import { payload } from '../client'

export async function getRunClub(id: string) {
  const club = await payload.find({
    collection: 'run-club',
    where: { id: { equals: id } },
  })
  return club
}
