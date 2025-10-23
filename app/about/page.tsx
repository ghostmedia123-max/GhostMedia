import {getAboutPage, getHeaderHeroData, getMoreServicesData} from '@/lib/data'
import { Metadata } from 'next';
import {
  SanitySeo,
  AboutPageData,
  AboutSection as AboutSectionType,
  HeaderHeroData,
} from '@/lib/types';
import HeaderHero from '@/components/HeaderHero';

import AboutSection from '@/components/AboutSection';
import DetailedStatistics from '@/components/DetailedStatistics'
import MoreServices from '@/components/MoreServices'
export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const aboutData: AboutPageData = (await getAboutPage()) || {};
  const { seo } = aboutData;

  const title = seo?.metaTitle || 'About Us';
  const description = seo?.metaDescription || aboutData.headline || 'Learn more about our company and mission.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function AboutPage() {
  const [aboutData, headerHeroData, moreServicesData] = await Promise.all([
    getAboutPage(),
    getHeaderHeroData('about'),
    getMoreServicesData(),
  ])

  // Define the color palette to cycle through for the sections
  const colors = ['#000000', '#000c49', '#000000'];
  const heroData = headerHeroData || { _type: 'headerHero' };

  return (
    <div className="flex flex-col">
      <HeaderHero data={heroData} />

      {/* 2. About Body Sections */}
      {aboutData?.sections?.map((section: AboutSectionType, index: number) => (
        <AboutSection
          key={section._key || index}
          section={section}
          index={index}
          color={colors[index % colors.length]}
        />
      ))}

      <MoreServices data={moreServicesData} />

      <DetailedStatistics data={aboutData?.detailedStatistics} />
    </div>
  );
}
