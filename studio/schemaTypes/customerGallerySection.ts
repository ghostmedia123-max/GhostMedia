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
  ],
  preview: {
    prepare() {
      return {title: 'Customer Gallery Section'}
    },
  },
})