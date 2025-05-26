import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name'],
  },
  fields: [
    { name: 'email', type: 'email', required: true },
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      options: ['admin', 'user'],
      defaultValue: 'user',
      required: true,
    },
  ],
}
