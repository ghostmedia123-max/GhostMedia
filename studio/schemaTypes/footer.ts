import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    }),
    defineField({
      name: 'siteIcon',
      title: 'Site Icon',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'network', title: 'Network', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'privacyPolicyPage',
      title: 'Privacy Policy Page',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'termsOfServicePage',
      title: 'Terms of Service Page',
      type: 'reference',
      to: [{type: 'page'}],
    }),
  ],
})