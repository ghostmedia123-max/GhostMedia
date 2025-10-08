import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'introduction',
  title: 'Introduction Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main headline for the introduction section on the homepage.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftColumn',
      title: 'Left Column Text',
      type: 'text',
      description: 'Text content for the left-hand side column.',
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column Text',
      type: 'text',
      description: 'Text content for the right-hand side column.',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
})