'use client';

import { urlFor } from '../lib/client';
import Image from 'next/image';
import { HeaderHeroData } from '../lib/types';

interface HeaderHeroProps {
  data: HeaderHeroData;
}

export default function HeaderHero({data}: HeaderHeroProps) {
  return (
    <section
      className="relative flex h-screen items-center justify-center bg-[#000c49] text-white overflow-hidden"
    >
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        {data.backgroundImage?.asset && (
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt={data.backgroundImage.alt || 'Hero background image'}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay for text readability, can be adjusted */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content will go here */}
      <div className="relative z-10">
        {/* We'll add headline, tagline, etc. in the next steps */}
      </div>
    </section>
  )
}
