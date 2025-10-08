import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'contentHero',
  title: 'Content Page Hero',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      description: 'A small line of text that can appear below the main content.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "Learn More").',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
      description: 'The URL the call-to-action button should link to.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
    },
  },
})
