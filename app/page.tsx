import ServicesGrid from '@/components/ServicesGrid';
import Hero from '@/components/Hero';
import { Metadata } from 'next';
import { urlFor } from '@/lib/client';
import StatsPreview from '@/components/StatsPreview';
import Introduction from '@/components/Introduction';
import MiniContactCTA from '@/components/MiniContactCTA';
import ToolsSection from '@/components/ToolsSection';
import StrategySection from '@/components/StrategySection';
import {
  getHeroData,
  getServicesData,
  getIntroductionData,
  getStatisticsData,
  getToolsSectionData,
  getStrategySectionData,
} from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  // Fetch data for metadata
  const heroData = (await getHeroData()) || {};
  const { seo } = heroData;

  const ogImage = heroData.backgroundImage?.asset
    ? urlFor(heroData.backgroundImage).width(1200).height(630).url()
    : 'https://your-default-og-image.com/image.png'; // A fallback image

  const title = seo?.metaTitle || heroData.headline || 'Home';
  const description = seo?.metaDescription || heroData.tagline || 'Welcome to our website.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: '/', // The canonical URL for this page
      images: [{ url: ogImage }],
    },
  };
}

// This is a Server Component, so you can fetch data directly
export default async function HomePage() {
  // Fetch the data needed for the components on this page
  // Using Promise.all to fetch data concurrently for better performance
  const [servicesResult, heroResult, statsResult, introResult, toolsResult, strategyResult] = await Promise.all([
    getServicesData(),
    getHeroData(),
    getStatisticsData(),
    getIntroductionData(),
    getToolsSectionData(),
    getStrategySectionData(),
  ]);

  // Provide individual fallbacks to ensure page renders even if some data is missing
  const servicesData = servicesResult || [];
  const heroData = heroResult || {};
  const statsData = statsResult || [];
  const introData = introResult || {};
  const toolsData = toolsResult || null;
  const strategyData = strategyResult || null;
  return (
    <main className="bg-black">
      <div className="overflow-hidden">
        <Hero data={heroData} />
        <Introduction data={introData} />
        <ServicesGrid data={servicesData} />
        <StrategySection data={strategyData} />
        <StatsPreview data={statsData} />
        <ToolsSection data={toolsData} />
        <MiniContactCTA />
      </div>
    </main>
  );
}