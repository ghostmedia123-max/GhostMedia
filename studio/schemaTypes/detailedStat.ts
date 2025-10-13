import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailedStat',
  title: 'Detailed Statistic',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainValue',
      title: 'Main Value',
      type: 'string',
      description: 'The large primary number (e.g., "30.1K").',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'percentageGrowth',
      title: 'Percentage Growth',
      type: 'number',
      description: 'The growth value (e.g., 1348.8 for +1,348.8%).',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'previousValue',
      title: 'Previous Value Text',
      type: 'string',
      description: 'The smaller text below the percentage (e.g., "2,079 previous").',
    }),
    defineField({
      name: 'progressRing',
      title: 'Progress Ring',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryValue',
          title: 'Primary Value (0-100)',
          type: 'number',
          validation: Rule => Rule.min(0).max(100),
        }),
        defineField({
          name: 'primaryLabel',
          title: 'Primary Label',
          type: 'string',
        }),
        defineField({
          name: 'secondaryValue',
          title: 'Secondary Value (0-100)',
          type: 'number',
          validation: Rule => Rule.min(0).max(100),
        }),
        defineField({
          name: 'secondaryLabel',
          title: 'Secondary Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'subStats',
      title: 'Sub-Statistics',
      type: 'array',
      of: [
        {
          name: 'subStat',
          title: 'Sub-Stat',
          type: 'object',
          fields: [defineField({name: 'label', type: 'string'}), defineField({name: 'value', type: 'string'})],
        },
      ],
    }),
  ],
})