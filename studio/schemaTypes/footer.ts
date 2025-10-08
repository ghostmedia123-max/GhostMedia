import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'GhostMediaTT',
    }),
    defineField({
      name: 'siteIcon',
      title: 'Site Icon/Logo',
      type: 'image',
      description: 'A small icon or logo for the footer.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Footer Description',
      type: 'text',
      description: 'A short tagline or description for the footer.',
      initialValue: 'Crafting digital experiences that captivate and convert.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      description: 'Add links to your social media profiles.',
      of: [
        defineField({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'network',
              title: 'Network',
              type: 'string',
              description: 'e.g., Facebook, Twitter, Instagram. Must match the icon name.',
            }),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'siteIcon',
    },
  },
})