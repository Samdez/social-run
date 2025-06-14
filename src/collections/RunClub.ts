import type { CollectionConfig } from 'payload'

export const RunClub: CollectionConfig = {
  slug: 'run-club',
  admin: { useAsTitle: 'name' },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'city',
      required: true,
    },
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'events',
      type: 'join',
      collection: 'run',
      on: 'organizer',
    },
  ],
}
