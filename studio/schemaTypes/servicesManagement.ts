import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'servicesManagement',
  title: 'Services Management',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'homepageSectionTitle',
      title: 'Homepage Section Title',
      type: 'string',
      description: 'The title for the services grid on the homepage.',
      initialValue: 'Our Services',
      group: 'homepage',
    }),
    defineField({
      name: 'homepageSectionDescription',
      title: 'Homepage Section Description',
      type: 'text',
      description: 'A short description to display below the title on the homepage.',
      group: 'homepage',
    }),
    defineField({
      name: 'homepageBackgroundImage',
      title: 'Homepage Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      description: 'Optional background image for the services section on the homepage.',
      group: 'homepage',
    }),
    defineField({
      name: 'homepageServices',
      title: 'Homepage Services',
      type: 'array',
      description: 'A simple list of services for the homepage, with just a title and an icon.',
      of: [
        {
          name: 'homepageService',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Service Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'serviceNumber',
              title: 'Service Number',
              type: 'number',
              description: 'The number to display in the square card (e.g., 1, 2).',
              validation: (Rule) => Rule.integer().positive(),
            }),
            defineField({
              name: 'serviceIcon',
              title: 'Icon',
              type: 'string',
              options: {
                list: ['Cog', 'ChartBar', 'ComputerDesktop', 'PaintBrush', 'Megaphone', 'Camera', 'CodeBracket'],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'shortDescription',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required().max(150),
            }),
          ],
        },
      ],
      group: 'homepage',
    }),
    defineField({
      name: 'aboutPageSectionTitle',
      title: 'About Page Section Title',
      type: 'string',
      description: 'The title for the detailed services section on the About page.',
      initialValue: 'Explore More Of What We Do',
      group: 'about',
    }),
    defineField({
      name: 'aboutPageBackgroundImage',
      title: 'About Page Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
      ],
      description: 'The background image for the detailed services section on the About page.',
      group: 'about',
    }),
    defineField({
      name: 'aboutPageServices',
      title: 'About Page Services',
      type: 'array',
      description: 'Select and order the services to display on the About page.',
      of: [{type: 'reference', to: [{type: 'service'}]}, {type: 'service'}],
      group: 'about',
    }),
  ],
  groups: [
    {name: 'homepage', title: 'Homepage', default: true},
    {name: 'about', title: 'About Page'},
  ],
})