'use server'

import { payload } from '../client'

export async function subscribeToRun(runId: string, userId: string) {
  const user = await payload.findByID({
    collection: 'users',
    id: userId,
    select: {
      runs: true,
    },
  })

  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      runs: [...(user.runs || []), runId],
    },
  })
}
