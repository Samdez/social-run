import { payload } from '../client'

export async function getRun(id: string) {
  const run = await payload.find({
    collection: 'run',
    where: { id: { equals: id } },
  })
  return run
}
