'use server'

import { revalidatePath } from 'next/cache'
import { payload } from '../client'

export async function subscribeToRun(runId: string, userId: string) {
  const run = await payload.findByID({
    collection: 'run',
    id: runId,
    select: {
      participants: true,
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
