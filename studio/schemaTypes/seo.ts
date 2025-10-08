import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  options: {
    collapsible: true, // Makes the UI cleaner
    collapsed: true, // Defaults to collapsed
  },
  // This field will be hidden unless the user is an administrator
  hidden: ({ currentUser }) => !currentUser?.roles.some((role) => role.name === 'administrator'),
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'The title that appears in the browser tab and in search engine results. Aim for 50-60 characters.',
      validation: (Rule) => Rule.max(60).warning('A title longer than 60 characters may be truncated.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the page content. Aim for 150-160 characters.',
      validation: (Rule) => Rule.max(160).warning('A description longer than 160 characters may be truncated.'),
    }),
  ],
})