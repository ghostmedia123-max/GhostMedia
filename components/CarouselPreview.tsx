import { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import { urlForImage } from '@/lib/image';

interface CarouselPreviewProps {
  data: PortfolioItem[];
}

export default function CarouselPreview({ data }: CarouselPreviewProps) {
  // Use the data passed in via props.
  const items: PortfolioItem[] = data;

  if (!items.length) {
    return null; // Don't render anything if there's no data
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Recent Work
        </h2>
        {/* Basic grid for now, will be replaced with a carousel library */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {items.map((item) => (
            <div key={item._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={urlForImage(item.image).width(400).height(400).url()}
                  alt={item.image.alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <h3 className="text-sm text-gray-700">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}