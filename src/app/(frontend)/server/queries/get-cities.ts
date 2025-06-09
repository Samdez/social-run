'use server'

import { payload } from '../client'

export async function getCities() {
  const event = await payload.find({ collection: 'city' })
  return event
}
