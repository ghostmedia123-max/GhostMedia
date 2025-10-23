import { Metadata } from 'next';
import { getContentHeroData, getTopCarouselData, getGalleryPageData, getGalleryCustomers } from '@/lib/data';
import { HeroData, CarouselData, SanitySeo } from '@/lib/types';
import Carousel from '@/components/Carousel';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';

interface ContentHeroData extends HeroData {
  seo?: SanitySeo;
}

// This ensures the page is always dynamically rendered.
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const contentHeroData: ContentHeroData = (await getContentHeroData()) || {};
  const title = contentHeroData.seo?.metaTitle || 'Our Content';
  const description = contentHeroData.seo?.metaDescription || 'Explore our services and browse our portfolio of recent work.';
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
  const [contentHeroData, topCarouselData, galleryPageData, galleryCustomers] = await Promise.all([
    getContentHeroData(),
    getTopCarouselData(),
    getGalleryPageData(),
    getGalleryCustomers(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero data={contentHeroData as HeroData} />
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