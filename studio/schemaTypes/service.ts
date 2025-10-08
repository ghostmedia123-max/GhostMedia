import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'
import React from 'react'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'number',
      title: 'Service Number',
      type: 'number',
      description: 'The number to display for this service (e.g., 1, 2, 3).',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Right Side)',
      type: 'text',
      description: 'A smaller, secondary description that will appear on the right side of the card.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      description: 'An emoji or a small icon image.',
      type: 'string', // Simple string for emoji, can be changed to image later
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of key features or bullet points for this service.',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'serviceIcon',
      title: 'Service Icon',
      type: 'string',
      description: 'Select an icon to represent this service.',
      options: {
        list: [
          {title: 'Cog', value: 'Cog'},
          {title: 'Chart Bar', value: 'ChartBar'},
          {title: 'Computer Desktop', value: 'ComputerDesktop'},
          {title: 'Paint Brush', value: 'PaintBrush'},
          {title: 'Megaphone', value: 'Megaphone'},
          {title: 'Camera', value: 'Camera'},
          {title: 'Code Bracket', value: 'CodeBracket'},
        ],
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "Learn More").',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
      description: 'The URL the button should link to (e.g., /services/consulting).',
      validation: (Rule) =>
        Rule.uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'icon', // Will show the emoji in the preview
    },
    prepare({title, subtitle, media}) {
      return {title, subtitle, media: React.createElement('span', {style: {fontSize: '1.5rem'}}, media)}
    },
  },
})