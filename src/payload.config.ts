import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Users } from './collections/Users'
import { Tenants } from './collections/Tenants'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Tenants],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    // Form builder plugin - Contact Us form with Full Name, Email, Message
    formBuilderPlugin({
      fields: {
        text: true, // Full Name
        email: true, // Email Address
        textarea: true, // Message
        message: true, // For displaying messages
        select: false,
        state: false,
        country: false,
        checkbox: false,
        number: false,
        date: false,
        payment: false,
      },
    }),
    // Multi-tenant plugin - Apply to Forms and Form Submissions only
    multiTenantPlugin({
      collections: {
        forms: {},
        'form-submissions': {},
      },
      tenantsSlug: 'tenants',
    }),
  ],
})
