import {getPageBySlug} from '@/lib/data'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {Metadata} from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
  }
}

export default async function LegalPage({params}: PageProps) {
  const page = await getPageBySlug(params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-32 sm:py-48 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-12">{page.title}</h1>
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={page.body} />
        </div>
      </div>
    </div>
  )
}