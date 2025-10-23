import {defineField, defineType} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryCustomer',
  title: 'Gallery Customer',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'A number to manually sort the galleries. Lower numbers appear first.',
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
      description: "A unique background image for this customer's section.",
    }),
    defineField({
      name: 'mediaItems',
      title: 'Media Items',
      type: 'array',
      of: [
        {
          name: 'imageItem',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'videoItem',
          title: 'Video',
          type: 'file',
          options: {accept: 'video/*'},
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'name', media: 'backgroundImage'},
  },
})