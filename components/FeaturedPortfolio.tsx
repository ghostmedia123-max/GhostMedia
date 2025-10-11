import { PortfolioItem } from '@/lib/types';
import Image from 'next/image';
import { urlForImage } from '@/lib/image';

interface FeaturedPortfolioProps {
  data: PortfolioItem[];
}

export default function FeaturedPortfolio({ data }: FeaturedPortfolioProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900">Featured Work</h2>
          <p className="mt-4 text-center text-gray-600">
            Featured portfolio items will be showcased here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Work</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A glimpse into some of our favorite projects.
          </p>
        </div>
        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {data.map((item) => (
            <div key={item._id} className="group">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <Image
                  src={urlForImage(item.image).width(800).height(450).url()}
                  alt={item.image.alt || item.title || 'Portfolio item image'}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{item.title}</h3>
              {item.description && <p className="mt-2 text-gray-600">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}