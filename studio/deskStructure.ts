import {type StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton documents
      S.listItem()
        .title('Hero Section')
        .id('hero')
        .child(S.document().schemaType('hero').documentId('hero')),
      S.listItem()
        .title('About Page')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Contact Info')
        .id('contactInfo')
        .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
      S.listItem()
        .title('Statistics')
        .id('statistics')
        .child(S.document().schemaType('statistics').documentId('statistics')),
      S.listItem()
        .title('Introduction Section')
        .id('introduction')
        .child(S.document().schemaType('introduction').documentId('introduction')),
      S.listItem()
        .title('Tools Section')
        .id('toolsSection')
        .child(S.document().schemaType('toolsSection').documentId('toolsSection')),
      S.listItem()
        .title('Strategy Section')
        .id('strategySection')
        .child(S.document().schemaType('strategySection').documentId('strategySection')),
      S.listItem()
        .title('Footer Content')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer')),
      S.listItem()
        .title('Contact Page Hero')
        .id('contactHero')
        .child(S.document().schemaType('contactHero').documentId('contactHero')),
      S.listItem()
        .title('About Page Hero')
        .id('aboutHero')
        .child(S.document().schemaType('aboutHero').documentId('aboutHero')),
      S.listItem()
        .title('Content Page Hero')
        .id('contentHero')
        .child(S.document().schemaType('contentHero').documentId('contentHero')),
      S.listItem()
        .title('Content Top Carousel')
        .id('contentTopCarousel')
        .child(S.document().schemaType('carousel').documentId('contentTopCarousel')),
      S.listItem()
        .title('Services Section')
        .id('servicesSection')
        .child(S.document().schemaType('servicesSection').documentId('servicesSection')),

      // Divider
      S.divider(),

      // Repeatable documents
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('portfolioItem').title('Portfolio Items'),

      // The rest of the document types, filtered to exclude the singletons
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'hero',
            'about',
            'contactInfo',
            'statistics',
            'detailedStatistics',
            'introduction',
            'toolsSection',
            'strategySection',
            'footer',
            'contactHero',
            'aboutHero',
            'contentHero',
            'contentTopCarousel',
            'servicesSection',
            'service',
            'portfolioItem',
          ].includes(listItem.getId() || ''),
      ),
    ])