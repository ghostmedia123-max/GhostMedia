import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons'

export default defineType({
  name: 'statistics',
  title: 'Statistics Section',
  type: 'document',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Impact in Numbers',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      description: 'A list of up to 3 key statistics to display on the homepage.',
      of: [
        defineField({
          type: 'object',
          name: 'stat',
          title: 'Statistic',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'The descriptive label (e.g., "Projects Completed").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'An optional icon to display from the Heroicons set.',
              options: {
                list: [
                  {title: 'Chart Bar', value: 'ChartBarIcon'},
                  {title: 'Chart Pie', value: 'ChartPieIcon'},
                  {title: 'Users', value: 'UsersIcon'},
                  {title: 'Trophy', value: 'TrophyIcon'},
                  {title: 'Rocket Launch', value: 'RocketLaunchIcon'},
                  {title: 'Light Bulb', value: 'LightBulbIcon'},
                  {title: 'Check Badge', value: 'CheckBadgeIcon'},
                  {title: 'Currency Dollar', value: 'CurrencyDollarIcon'},
                  {title: 'Cog', value: 'Cog6ToothIcon'},
                  {title: 'Sparkles', value: 'SparklesIcon'},
                  {title: 'Megaphone', value: 'MegaphoneIcon'},
                ],
              },
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The numerical value (e.g., "50").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'An optional suffix to append to the value (e.g., "k", "+").',
            }),
          ],
        }),
      ],
    }),
  ],
})
