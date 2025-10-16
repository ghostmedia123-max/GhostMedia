import { Metadata } from 'next';
import {
  getContentHeroData,
  getTopCarouselData,
  getCustomerGalleries,
  getCustomerGallerySectionData,
} from '@/lib/data';
import { HeroData, CarouselData, SanitySeo, CustomerGallerySectionData } from '@/lib/types';
import Carousel from '@/components/Carousel';
import Hero from '@/components/Hero';
import CustomerGallery from '@/components/CustomerGallery';

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
  const [contentHeroData, topCarouselData, customerGalleries, gallerySectionData] = await Promise.all([
    getContentHeroData(),
    getTopCarouselData(),
    getCustomerGalleries(),
    getCustomerGallerySectionData(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero data={contentHeroData as HeroData} />
      <div className="bg-black">
      <main>
        {/* Top Carousel Section */}
        <Carousel data={topCarouselData as CarouselData} duration={30} />

        {/* New Customer Gallery Section */}
        <CustomerGallery galleries={customerGalleries} sectionData={gallerySectionData} />
      </main>
      </div>
    </div>
  );
}