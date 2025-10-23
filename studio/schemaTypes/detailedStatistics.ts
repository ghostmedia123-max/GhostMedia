import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailedStatistics',
  title: 'Detailed Statistics Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The main title for the detailed statistics section (e.g., "Our Impact").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'The list of detailed statistics to display.',
      of: [
        {
          name: 'detailedStat',
          title: 'Detailed Statistic',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The main label for this statistic (e.g., "Client Retention").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'mainValue',
              title: 'Main Value',
              type: 'string',
              description: 'The primary value to display (e.g., "98.6%").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'An optional suffix to display after the main value (e.g., "k", "%", "+").',
            }),
            defineField({
              name: 'percentageGrowth',
              title: 'Percentage Growth',
              type: 'number',
              description: 'The growth percentage to show next to the trending icon.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'previousValue',
              title: 'Previous Value Text',
              type: 'string',
              description: 'Text describing the previous period (e.g., "from 97.2% last month").',
            }),
            defineField({
              name: 'progressRing',
              title: 'Progress Ring',
              type: 'object',
              description: '(Optional) Add a progress ring visualization.',
              fields: [
                defineField({
                  name: 'primaryValue',
                  title: 'Primary Value (%)',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(100),
                }),
                defineField({
                  name: 'primaryLabel',
                  title: 'Primary Label',
                  type: 'string',
                }),
                defineField({
                  name: 'secondaryValue',
                  title: 'Secondary Value (%)',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(100),
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
              description: '(Optional) Add up to three smaller sub-stats.',
              of: [
                {
                  name: 'subStat',
                  title: 'Sub-Statistic',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
            defineField({
              name: 'descriptionBoxes',
              title: 'Description Boxes',
              type: 'array',
              description: '(Optional) Add up to two description boxes that appear to the right of the main stat.',
              of: [
                {
                  name: 'descriptionBox',
                  title: 'Description Box',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'text',
                      title: 'Description',
                      type: 'text',
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.max(2),
            }),
          ],
        },
      ],
    }),
  ],
})