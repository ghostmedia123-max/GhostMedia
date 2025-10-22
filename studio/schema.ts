import {type SchemaTypeDefinition} from 'sanity'
import about from './schemaTypes/about'
import aboutHero from './schemaTypes/aboutHero'
import contactHero from './schemaTypes/contactHero'
import contactInfo from './schemaTypes/contactInfo'
import carousel from './schemaTypes/carousel'
import contentHero from './schemaTypes/contentHero'
import footer from './schemaTypes/footer'
import hero from './schemaTypes/hero'
import introduction from './schemaTypes/introduction'
import gallerySection from './schemaTypes/gallerySection'
import galleryItem from './schemaTypes/galleryItem'
import portfolioItem from './schemaTypes/portfolioItem'
import service from './schemaTypes/service'
import statistics from './schemaTypes/statistics'
import servicesSection from './schemaTypes/servicesSection'
import strategySection from './schemaTypes/strategySection'
import toolsSection from './schemaTypes/toolsSection'
import detailedStatistics from './schemaTypes/detailedStatistics'
import customerGallery from './schemaTypes/customerGallery'
import customerGallerySection from './schemaTypes/customerGallerySection'
import page from './schemaTypes/page'
import moreServices from './schemaTypes/moreServices'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    about,
    aboutHero,
    contactHero,
    contactInfo,
    carousel,
    contentHero,
    footer,
    galleryItem,
    gallerySection,
    hero,
    introduction,
    portfolioItem,
    service,
    servicesSection,
    statistics,
    strategySection,
    toolsSection,
    detailedStatistics,
    customerGallery,
    customerGallerySection,
    page,
    moreServices,
  ],
}
