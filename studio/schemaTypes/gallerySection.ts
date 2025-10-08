import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title for the portfolio gallery section.',
      initialValue: 'Our Work in Motion',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description to appear below the title.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Gallery Section Settings',
      }
    },
  },
})