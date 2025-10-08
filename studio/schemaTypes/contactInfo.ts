import {defineField, defineType} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export default defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'mainHeadline',
      title: 'Main Headline',
      type: 'string',
      description: "The main title on the contact page, e.g., 'Let's Connect'.",
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub-headline',
      type: 'text',
      description: 'The paragraph below the main headline.',
    }),
    defineField({
      name: 'infoBoxTitle',
      title: 'Info Box Title',
      type: 'string',
      description:
        "The title inside the contact card, e.g., 'Contact Information'.",
    }),
    defineField({
      name: 'socialsTitle',
      title: 'Socials Section Title',
      type: 'string',
      description: "The title for the social media links, e.g., 'Follow Us'.",
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
      description: 'The full URL for the Google Maps embed.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({name: 'network', type: 'string', title: 'Network (e.g., Facebook)'}),
            defineField({name: 'url', type: 'url', title: 'URL'}),
          ],
        },
      ],
    }),
  ],
})