'use client'

import {SanityImage} from '@/lib/types'
import Image from 'next/image'
import {urlFor} from '@/lib/client'

interface MoreServicesProps {
  data: {
    title?: string
    backgroundImage?: SanityImage
  } | null
}

export default function MoreServices({data}: MoreServicesProps) {
  return (
    <section className="relative flex h-screen items-center justify-center bg-black text-white">
      {data?.backgroundImage?.asset && (
        <>
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt={data.backgroundImage.alt || 'More services background'}
            fill
            className="absolute inset-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60" />
        </>
      )}
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{data?.title || 'Explore More Services'}</h2>
      </div>
    </section>
  )
}