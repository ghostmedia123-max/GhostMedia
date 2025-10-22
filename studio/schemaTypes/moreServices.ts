import {defineField, defineType} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export default defineType({
  name: 'moreServices',
  title: 'More Services Section',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The title for the "More Services" section.',
      initialValue: 'Explore More Of What We Do',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
      description: 'The background image for the section.',
    }),
  ],
})