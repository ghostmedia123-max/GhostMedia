import {defineField, defineType} from 'sanity'
import {PlayIcon, ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the gallery item.',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: Rule =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.mediaType === 'image' && !value) {
            return 'Image is required when media type is "Image"'
          }
          return true
        }),
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: Rule =>
        Rule.custom((value, context) => {
          if ((context.parent as any)?.mediaType === 'video' && !value) {
            return 'Video file is required when media type is "Video"'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', image: 'image', mediaType: 'mediaType'},
    prepare({title, image, mediaType}) {
      return {
        title: title || 'Untitled',
        subtitle: `Type: ${mediaType}`,
        media: mediaType === 'image' ? image : PlayIcon,
      }
    },
  },
})