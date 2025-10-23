import {getAboutPage, getMoreServicesData} from '@/lib/data'
import { Metadata } from 'next';
import {
  HeroData,
  SanitySeo,
  AboutPageData,
  AboutSection as AboutSectionType,
} from '@/lib/types';
// import Hero from '@/components/Hero';

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
  const [aboutData, moreServicesData] = await Promise.all([
    getAboutPage(),
    // getAboutHeroData(),
    getMoreServicesData(),
  ])

  // Define the color palette to cycle through for the sections
  const colors = ['#000000', '#000c49', '#000000'];

  return (
    <div className="flex flex-col">
      {/* <Hero data={aboutHeroData} /> */}

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
