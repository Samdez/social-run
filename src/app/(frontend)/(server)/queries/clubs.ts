import { payload } from '../client'

export async function getRunClubs() {
  const clubs = await payload.find({
    collection: 'run-club',
  })
  return clubs
}
