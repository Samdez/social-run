import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'authProviderId',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'runs',
      type: 'relationship',
      relationTo: 'run',
      hasMany: true,
    },
    {
      name: 'run-clubs-member',
      type: 'relationship',
      relationTo: 'run-club',
      hasMany: true,
    },
    {
      name: 'run-clubs-owner',
      type: 'relationship',
      relationTo: 'run-club',
      hasMany: true,
    },
  ],
}
