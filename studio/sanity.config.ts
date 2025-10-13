import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schema'
import {deskStructure} from './deskStructure'
import seo from './schemaTypes/seo' // Corrected path
import page from './schemaTypes/page' // Corrected path
import detailedStat from './schemaTypes/detailedStat'
import detailedStatistics from './schemaTypes/detailedStatistics'

export default defineConfig({
  name: 'default',
  title: 'GmediaTT',

  projectId: '6omuu11j',
  dataset: 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  // Add the schema to the config
  schema: {
    // Add the new schemas to the existing types
    types: [...schema.types, seo, page, detailedStat, detailedStatistics],
  },
})
