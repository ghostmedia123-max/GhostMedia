import {type SchemaTypeDefinition} from 'sanity'
import about from './schemaTypes/about'
import contactInfo from './schemaTypes/contactInfo'
import carousel from './schemaTypes/carousel'
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
import footer from './schemaTypes/footer'
import page from './schemaTypes/page'
import headerHero from './schemaTypes/headerhero'

export const schema = {
  types: [
    headerHero,
    about,
    contactInfo,
    carousel,
    footer,
    galleryItem,
    gallerySection,
    introduction,
    portfolioItem,
    statistics,
    strategySection,
    toolsSection,
    galleryPage,
    galleryCustomer,
    page,
    servicesManagement,
    service,
    detailedStatistics,
  ],
}
