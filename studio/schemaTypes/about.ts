import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      description: 'The main headline for the about section.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          title: 'Section',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'detailedStatistics',
      title: 'Detailed Statistics Section',
      type: 'reference',
      to: [{type: 'detailedStatistics'}],
      description: 'Link to the detailed statistics section to display on this page.',
    }),
  ],
})