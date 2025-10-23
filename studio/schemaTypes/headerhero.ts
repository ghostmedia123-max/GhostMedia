import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'headerHero',
  title: 'Header Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      description: 'The main background image for the hero section.',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: '_id',
      media: 'backgroundImage',
    },
    prepare({title, media}) {
      return {
        title: `Hero: ${title.split('_')[1] || 'Unknown'} Page`,
        media: media,
      }
    },
  },
})
