import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main headline for the hero section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      description: 'A short piece of text that appears below the main headline.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A secondary line of text, often used for a call to action message.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Optional logo to display next to the headline.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'The background image for the hero section.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'The URL the button should link to (e.g., /contact).',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'backgroundImage',
    },
  },
})