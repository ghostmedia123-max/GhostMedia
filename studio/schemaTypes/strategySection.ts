import {defineField, defineType} from 'sanity'
import {ListIcon} from '@sanity/icons'

export default defineType({
  name: 'strategySection',
  title: 'Strategy Section',
  type: 'document',
  icon: ListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Strategy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      description: 'The steps in your business strategy.',
      of: [
        defineField({
          name: 'step',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
})