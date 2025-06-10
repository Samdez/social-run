'use server'

import { Run } from '@/payload-types'
import { db } from '../drizzle'
import { run } from '../schema'
import { sql } from 'drizzle-orm'

export async function createRun(data: Run) {
  const cityId = typeof data.city === 'string' ? data.city : data.city.id
  const organizerId = typeof data.organizer === 'string' ? data.organizer : data.organizer?.id

  await db.insert(run).values({
    payloadId: sql`${data.id}`,
    name: sql`${data.title}`,
    description: sql`${data.description}`,
    type: sql`${data.type}`,
    date: sql`${new Date(data.date)}`,
    cityPayloadId: sql`${cityId}`,
    location: data.location ? sql`point(${data.location[0]}, ${data.location[1]})` : null,
    startAddress: sql`${data['start address']}`,
    distance: sql`${data.distance}`,
    maxParticipants: sql`${data.maxParticipants}`,
    organizerPayloadId: sql`${organizerId}`,
    membersOnly: sql`${data.membersOnly}`,
  })
}
