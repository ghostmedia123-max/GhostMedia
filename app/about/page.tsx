import {
  getAboutPage,
  getAllStatistics,
  getAboutHeroData,
  getServicesSectionData,
  getServicesData,
} from '@/lib/data';
import { Metadata } from 'next';
import { HeroData, SanitySeo, AboutPageData, AboutSection as AboutSectionType, Service, ServicesSectionData, DetailedStat } from '@/lib/types';
import Hero from '@/components/Hero';

import AboutSection from '@/components/AboutSection';
import DetailedServicesGrid from '@/components/DetailedServicesGrid';
import DetailedStatistics from '@/components/DetailedStatistics';
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
  const [aboutData, aboutHeroData, servicesSectionData, servicesData] = await Promise.all([
    getAboutPage(),
    getAboutHeroData(),
    getServicesSectionData(),
    getServicesData(),
  ]);

  // Define the color palette to cycle through for the sections
  const colors = ['#000c49', '#000000', '#000729'];

  return (
    <div className="flex flex-col">
      <Hero data={aboutHeroData} />

      {/* 2. About Body Sections */}
      {aboutData?.sections?.map((section: AboutSectionType, index: number) => (
        <AboutSection
          key={section._key || index}
          section={section}
          index={index}
          color={colors[index % colors.length]}
        />
      ))}

      {/* 3. Services Grid */}
      <DetailedServicesGrid sectionData={servicesSectionData} services={servicesData || []} />

      {/* 4. Detailed Statistics Dashboard */}
      {aboutData?.detailedStatistics && <DetailedStatistics data={aboutData.detailedStatistics} />}
    </div>
  );
}
