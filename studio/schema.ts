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
import statistics from './schemaTypes/statistics'
import strategySection from './schemaTypes/strategySection'
import toolsSection from './schemaTypes/toolsSection'
import detailedStatistics from './schemaTypes/detailedStatistics'
import service from './schemaTypes/service'
import servicesManagement from './schemaTypes/servicesManagement'
import galleryPage from './schemaTypes/galleryPage'
import galleryCustomer from './schemaTypes/galleryCustomer'
import page from './schemaTypes/page'

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
    statistics,
    strategySection,
    toolsSection,
    detailedStatistics,
    service,
    servicesManagement,
    galleryPage,
    galleryCustomer,
    page,
  ],
}
