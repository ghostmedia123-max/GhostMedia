import {type StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton documents
      S.listItem()
        .title('Header Heroes')
        .id('headerHeroes')
        .child(
          S.list()
            .title('Header Heroes')
            .items([
              S.listItem()
                .title('Home Page Hero')
                .child(S.document().schemaType('headerHero').documentId('headerHero_home')),
              S.listItem()
                .title('About Page Hero')
                .child(S.document().schemaType('headerHero').documentId('headerHero_about')),
              S.listItem()
                .title('Contact Page Hero')
                .child(S.document().schemaType('headerHero').documentId('headerHero_contact')),
              S.listItem()
                .title('Content Page Hero')
                .child(S.document().schemaType('headerHero').documentId('headerHero_content')),
            ]),
        ),
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
        .title('Content Top Carousel')
        .id('contentTopCarousel')
        .child(S.document().schemaType('carousel').documentId('contentTopCarousel')),
      S.listItem().title('Gallery Page').id('galleryPage').child(S.document().schemaType('galleryPage').documentId('galleryPage')),
      S.listItem().title('Services Management').id('servicesManagement').child(S.document().schemaType('servicesManagement').documentId('servicesManagement')),

      // Divider
      S.divider(),

      // Repeatable documents
      S.documentTypeListItem('portfolioItem').title('Portfolio Items'),
      S.documentTypeListItem('galleryCustomer').title('Gallery Customers'),
      S.documentTypeListItem('page').title('Pages'),

      // The rest of the document types, filtered to exclude the singletons
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'headerHero', // This will hide the generic 'Header Hero' type from the main list
            'about',
            'contactInfo',
            'statistics',
            'introduction',
            'toolsSection',
            'strategySection',
            'footer',
            'contentTopCarousel',
            'portfolioItem',
            'servicesManagement',
            'galleryPage',
            'galleryCustomer',
            'page',
          ].includes(listItem.getId() || ''),
      ),
    ])