import type { CollectionConfig } from 'payload'

export const Run: CollectionConfig = {
  slug: 'run',
  fields: [
    {
      name: 'title',
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
      name: 'type',
      type: 'select',
      options: ['road', 'trail'],
      required: true,
      defaultValue: 'road',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'city',
      type: 'relationship',
      relationTo: 'city',
      required: true,
    },
    {
      name: 'location',
      type: 'point',
    },
    {
      name: 'start address',
      type: 'text',
    },
    {
      name: 'distance',
      type: 'number',
    },
    {
      name: 'maxParticipants',
      type: 'number',
      required: true,
    },
    {
      name: 'membersOnly',
      type: 'checkbox',
    },
    {
      name: 'organizer',
      type: 'relationship',
      relationTo: 'run-club',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'participants',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
  ],
}
