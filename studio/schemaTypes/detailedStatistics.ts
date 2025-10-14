import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailedStatistics',
  title: 'Detailed Statistics Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [{type: 'detailedStat'}],
    }),
  ],
})