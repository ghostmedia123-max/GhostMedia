import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export default defineType({
  name: 'carousel',
  title: 'Carousel',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'An internal identifier for this carousel (e.g., "Top Content Carousel").',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading for this carousel section.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description or tagline to display below the title.',
    }),
    defineField({
      name: 'featureFirstSlide',
      title: 'Feature First Slide',
      type: 'boolean',
      description: 'If enabled, the first slide will be displayed for a longer duration before the carousel starts scrolling.',
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          title: 'Slide',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'headline',
              title: 'Headline',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'headline',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})