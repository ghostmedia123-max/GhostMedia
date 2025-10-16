import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'customerGallerySection',
  title: 'Customer Gallery Section',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the client work section (e.g., "Client Work").',
      initialValue: 'Client Work',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional background image for the entire customer gallery section.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Customer Gallery Section'}
    },
  },
})