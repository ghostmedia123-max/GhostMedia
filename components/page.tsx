import {Metadata} from 'next'
import {getGalleryPageData, getGalleryCustomers} from '@/lib/data'
import Gallery from '@/components/Gallery'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const pageData = (await getGalleryPageData()) || {}
  const title = pageData.title || 'Gallery'
  const description = pageData.description || 'Browse our gallery of work.'


  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

export default async function GalleryPage() {
  const [pageData, customers] = await Promise.all([getGalleryPageData(), getGalleryCustomers()])

  // For debugging: Log the fetched data to the server console
  console.log('--- Gallery Page Data ---', JSON.stringify(pageData, null, 2))
  console.log('--- Gallery Customers Data ---', JSON.stringify(customers, null, 2))

  return (
    <div className="flex flex-col">
      <main>
        <Gallery pageData={pageData} customers={customers || []} />
      </main>
    </div>
  )
}