import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'customerGallery',
  title: 'Customer Gallery',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          name: 'media',
          title: 'Media',
          type: 'image', // You can also use a custom object with image and video fields
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
})