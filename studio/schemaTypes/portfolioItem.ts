import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      description: 'Upload one or more images or videos for this portfolio item.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
        // Video type can be added here later if needed
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({name: 'category', title: 'Category', type: 'string'}),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
    }),
  ],
})