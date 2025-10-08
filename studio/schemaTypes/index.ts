import {type SchemaTypeDefinition} from 'sanity'

import hero from './hero' // This was correct, but the file was in the wrong place.
import statistics from './statistics'
import service from './service'
import portfolioItem from './portfolioItem'
import about from './about'
import contactInfo from './contactInfo'
import introduction from './introduction'
import toolsSection from './toolsSection'
import strategySection from './strategySection'
import footer from './footer'
import contactHero from './contactHero'
import aboutHero from './aboutHero'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Document types
    hero,
    statistics,
    about,
    contactInfo,
    service,
    portfolioItem,
    introduction,
    toolsSection,
    strategySection,
    footer,
    contactHero,
    aboutHero,

    // Object types
  ],
}