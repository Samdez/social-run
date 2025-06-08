'use server'

import { payload } from '../client'

export async function getRuns() {
  const event = await payload.find({ collection: 'run' })
  return event
}
