import { Metadata } from 'next';
import { getHeaderHeroData, getTopCarouselData, getGalleryPageData, getGalleryCustomers } from '@/lib/data';
import { HeaderHeroData, CarouselData, SanitySeo } from '@/lib/types';
import Carousel from '@/components/Carousel';
import HeaderHero from '@/components/HeaderHero';
import Gallery from '@/components/Gallery';

// This ensures the page is always dynamically rendered.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  // const contentHeroData: ContentHeroData = (await getContentHeroData()) || {};
  const title = 'Our Content';
  const description = 'Explore our services and browse our portfolio of recent work.';
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ContentPage() {
  // Fetch all data concurrently for performance
  const [headerHeroData, topCarouselData, galleryPageData, galleryCustomers] = await Promise.all([
    getHeaderHeroData('content'),
    getTopCarouselData(),
    getGalleryPageData(),
    getGalleryCustomers(),
  ]);
  const heroData = headerHeroData || { _type: 'headerHero' };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeaderHero data={heroData} />
      <div className="bg-black text-white">
      <main>
        {/* Top Carousel Section */}
        <Carousel data={topCarouselData as CarouselData} duration={30} />
        {/* Rebuilt Gallery Section */}
        <Gallery pageData={galleryPageData} customers={galleryCustomers || []} />
      </main>
      </div>
    </div>
  );
}