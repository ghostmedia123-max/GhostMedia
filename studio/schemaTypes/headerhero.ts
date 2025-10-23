import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'headerHero',
  title: 'Header Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'The main headline for the hero section.',
      type: 'string',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      description: 'A short piece of text that appears below the main headline.',
      type: 'text',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'A secondary line of text, often used for a call to action message.',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Optional logo to display next to the headline.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
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
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      description: 'The URL the button should link to (e.g., /contact).',
      type: 'string',
    }),
    // You can add SEO settings here later if needed, similar to the old hero.
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
