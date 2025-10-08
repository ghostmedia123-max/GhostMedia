import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    // ... your other page fields

    // HERE IS THE MAGIC:
    // We are adding the 'seo' object to this document type
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo', // This references the 'seo.ts' schema we created
    }),
  ],
})