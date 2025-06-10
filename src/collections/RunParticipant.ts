import type { CollectionConfig } from 'payload'

export const RunParticipant: CollectionConfig = {
  slug: 'run-participants',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'run',
      type: 'relationship',
      relationTo: 'run',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'joinedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
    {
      name: 'status',
      type: 'select',
      options: ['registered', 'attended', 'cancelled'],
      defaultValue: 'registered',
      required: true,
    },
  ],
}
