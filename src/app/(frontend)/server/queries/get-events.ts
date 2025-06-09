'use server'

import { payload } from '../client'

export async function getRuns() {
  const event = await payload.find({ collection: 'run', sort: 'date' })
  console.log('🚀 ~ getRuns ~ event:', event)
  return event
}
