'use server'

import { revalidatePath } from 'next/cache'
import { payload } from '../client'

export async function subscribeToRun(runId: string, userId: string) {
  const user = await payload.findByID({
    collection: 'users',
    id: userId,
    select: {
      runs: true,
    },
  })
  const run = await payload.findByID({
    collection: 'run',
    id: runId,
    select: {
      participants: true,
    },
  })

  await payload.update({
    collection: 'users',
    id: userId,
    data: {
      runs: [...(user.runs || []), runId],
    },
  })

  await payload.update({
    collection: 'run',
    id: runId,
    data: {
      participants: [...(run.participants || []), userId],
    },
  })

  revalidatePath('/')
}
