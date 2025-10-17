import {defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons'

export default defineType({
  name: 'toolsSection',
  title: 'Tools Section',
  type: 'document',
  icon: WrenchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Tools We Use',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of the tools section.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image for the tools section card.',
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
    }),
    defineField({
      name: 'tools',
      title: 'Tools',
      type: 'array',
      description: 'Add logos or images of the tools you use.',
      of: [
        defineField({
          name: 'tool',
          title: 'Tool',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Tool Image/Logo',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text Below Image',
              type: 'string',
              description: '(Optional) A short text to display below the image.',
            }),
          ],
        }),
      ],
    }),
  ],
})