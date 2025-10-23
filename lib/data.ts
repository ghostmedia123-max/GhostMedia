import { createClient, groq } from 'next-sanity';
import { client } from './client';
import { MoreServicesData } from './types';
// Default content from local JSON files
import heroDefaults from '@/defaults/hero-default.json';
import statsDefaults from '@/defaults/stats-default.json';
import portfolioDefaults from '@/defaults/portfolio-default.json';
import introductionDefaults from '@/defaults/introduction-default.json';
import contactDefaults from '@/defaults/contact-default.json';
import servicesDefaults from '@/defaults/services-default.json';
import {
  HeroData,
  Statistic,
  PortfolioItem,
  ContactInfoData,
  IntroductionData,
  Service,
  ToolsSectionData,
  StrategyStep,
  FooterData,
  CarouselData,
  GalleryItem,
  GallerySectionData,
} from './types';
import clientPromise from '@/lib/mongodb';

// This function was previously in layout.tsx, moving it here for consistency.
export async function getContactInfo() {
  try {
    const query = groq`*[_type == "contactInfo"][0]{..., "mapUrl": map.url}`;
    const data = await client.fetch<ContactInfoData>(query);
    return data || (contactDefaults as ContactInfoData);
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    return contactDefaults as ContactInfoData;
  }
}

export async function getFooterData() {
  try {
    const query = groq`*[_type == "footer"][0]{
      ...,
      "privacyPolicySlug": privacyPolicyPage->slug.current,
      "termsOfServiceSlug": termsOfServicePage->slug.current
    }`;
    const data = await client.fetch<FooterData>(query, {}, {cache: 'no-store'});
    return data || {};
  } catch (error) {
    console.error('Failed to fetch footer data:', error);
    return {};
  }
}

export async function getAboutPage() {
  try {
    // Fetches the headline and rich text body for the About page.
    const query = groq`*[_type == "about"][0] {
      headline,
      sections[]{..., backgroundImage},
      seo,
      detailedStatistics{
        title,
        stats[]{
          _key,
          label,
          mainValue,
          suffix,
          percentageGrowth,
          previousValue,
          progressRing,
          subStats,
          descriptionBoxes
        }
      }
    }`;
    const data = await client.fetch(query, {}, {cache: 'no-store'});
    return data;
  } catch (error) {
    console.error('Failed to fetch about page data:', error);
    return { headline: 'About Us', sections: [] };
  }
}

export async function getAllStatistics() {
  try {
    const query = groq`*[_type == "statistics"][0].stats[]{
      _key,
      label,
      value,
      icon,
      description, // This was correct
      suffix // This was also correct
    }`;
    const data = await client.fetch<Statistic[] | null>(query, {}, { cache: 'no-store' });
    return data && data.length > 0 ? data : statsDefaults.stats;
  } catch (error) {
    console.error('Failed to fetch all statistics:', error);
    return statsDefaults.stats;
  }
}

export async function getServicesData() {
  try {
    // Fetches services selected for the homepage
    const query = groq`*[_type == "servicesManagement"][0]{
      "services": homepageServices[]->{...}
    }`;
    const data = await client.fetch<{services: Service[]}>(query);
    return data?.services || []; // Return an empty array if no services are found
  } catch (error) {
    console.error('Failed to fetch services data:', error);
    return servicesDefaults as Service[];
  }
}

export async function getServicesSectionData() {
  try {
    const query = groq`*[_type == "servicesManagement"][0]{ 
      "title": homepageSectionTitle, "description": homepageSectionDescription, "backgroundImage": homepageBackgroundImage 
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch services section data:', error);
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const query = groq`*[_type == "page" && slug.current == $slug][0]{
      title,
      body
    }`;
    const data = await client.fetch(query, {slug});
    return data;
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
}
export async function getHeroData() {
  try {
    const query = groq`*[_type == "hero"][0]{..., logo, subtext}`;
    const data = await client.fetch<HeroData>(query);
    // If Sanity returns data, use it. Otherwise, fall back to default.
    return data || (heroDefaults as unknown as HeroData);
  } catch (error) {
    console.error('Failed to fetch hero data from Sanity, falling back to default:', error);
    // In case of any error (e.g., network failure), return the default content.
    return heroDefaults as unknown as HeroData;
  }
}

export async function getIntroductionData() {
  try {
    const query = groq`*[_type == "introduction"][0]`;
    const data = await client.fetch<IntroductionData>(query);
    return data || (introductionDefaults as IntroductionData);
  } catch (error) {
    console.error('Failed to fetch introduction data:', error);
    return introductionDefaults as IntroductionData;
  }
}

export async function getStatisticsData() {
  try {
    const query = groq`*[_type == "statistics"][0].stats[]{
      _key,
      label,
      value,
      icon,
      suffix
    }`;
    const data = await client.fetch<Statistic[]>(query, {}, { cache: 'no-store' });
    return data && data.length > 0 ? data : statsDefaults.stats;
  } catch (error) {
    console.error('Failed to fetch statistics data:', error);
    return statsDefaults.stats;
  }
}

export async function getToolsSectionData() {
  try {
    const query = groq`*[_type == "toolsSection"][0]{..., backgroundImage}`;
    const data = await client.fetch<ToolsSectionData>(query);
    return data;
  } catch (error) {
    console.error('Failed to fetch tools section data:', error);
    return null;
  }
}

export async function getStrategySectionData(): Promise<{ title: string; steps: StrategyStep[] } | null> {
  try {
    const query = groq`*[_type == "strategySection"][0]{
      title,
      steps
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch strategy section data:', error);
    return null;
  }
}

export async function getContactHeroData() {
  try {
    const query = groq`*[_type == "contactHero"][0]`;
    const data = await client.fetch<HeroData>(query);
    return data || (heroDefaults as unknown as HeroData);
  } catch (error) {
    console.error('Failed to fetch contact hero data:', error);
    return heroDefaults as unknown as HeroData;
  }
}

export async function getAboutHeroData() {
  try {
    const query = groq`*[_type == "aboutHero"][0]`;
    const data = await client.fetch<HeroData>(query);
    return data || (heroDefaults as unknown as HeroData);
  } catch (error) {
    console.error('Failed to fetch about hero data:', error);
    return heroDefaults as unknown as HeroData;
  }
}

export async function getContentHeroData() {
  try {
    const query = groq`*[_type == "contentHero"][0]{
      headline,
      tagline,
      subtext,
      backgroundImage,
      ctaText,
      ctaLink
    }`;
    const data = await client.fetch<HeroData>(query);
    return data || (heroDefaults as unknown as HeroData);
  } catch (error) {
    console.error('Failed to fetch content hero data:', error);
    return heroDefaults as unknown as HeroData;
  }
}

export async function getTopCarouselData() {
  try {
    const query = groq`*[_type == "carousel" && _id == "contentTopCarousel"][0]{
      title,
      description,
      featureFirstSlide,
      slides[]{..., "image": image.asset->}
    }`;
    const data = await client.fetch(query, {}, { cache: 'no-store' });
    return data;
  } catch (error) {
    console.error('Failed to fetch top carousel data:', error);
    return null;
  }
}

export async function getFeaturedPortfolioItems() {
  try {
    // Fetches portfolio items where featured is true
    const query = groq`*[_type == "portfolioItem" && featured == true] {
      _id,
      title,
      description,
      "image": media.image,
      "videoUrl": media.videoUrl
    }`;
    const data = await client.fetch<PortfolioItem[]>(query);
    return data && data.length > 0 ? data : [];
  } catch (error) {
    console.error('Failed to fetch featured portfolio items:', error);
    return [];
  }
}

export async function getAllPortfolioItems() {
  try {
    // Fetches all portfolio items
    const query = groq`*[_type == "portfolioItem"] {
      _id,
      title,
      "image": media.image
    }`;
    const data = await client.fetch<PortfolioItem[]>(query);
    return data && data.length > 0 ? data : (portfolioDefaults.items as PortfolioItem[]);
  } catch (error) {
    console.error('Failed to fetch all portfolio items:', error);
    return portfolioDefaults.items as PortfolioItem[];
  }
}

const ITEMS_PER_PAGE = 10;
export async function getSubmissions(query?: string, currentPage: number = 1) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const filter = query ? { email: { $regex: query, $options: 'i' } } : {};

    const submissionsCollection = db.collection('submissions');

    const totalSubmissions = await submissionsCollection.countDocuments(filter);
    const totalPages = Math.ceil(totalSubmissions / ITEMS_PER_PAGE);

    const submissions = await db
      .collection('submissions')
      .find(filter)
      .sort({ createdAt: -1 }) // Sort by most recent
      .skip((currentPage - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    return {
      submissions: JSON.parse(JSON.stringify(submissions)), // Serialize data for the client
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return { submissions: [], totalPages: 0 };
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const query = groq`*[_type == "galleryItem"] | order(_createdAt desc) {
    _id,
    title,
    "mediaUrl": coalesce(image.asset->url, video.asset->url),
    "mediaType": coalesce(image.asset->mimeType, video.asset->mimeType)
  }`;
  return client.fetch(query);
}

export async function getGallerySectionData(): Promise<GallerySectionData | null> {
  try {
    const query = groq`*[_type == "gallerySection"][0]{
      title, description
    }`;
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Failed to fetch gallery section data:', error);
    return null;
  }
}

export async function getAnalyticsSummary() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const pageviewsLast7Days = await db.collection('pageviews').countDocuments({ timestamp: { $gte: daysAgo(7) } });
    const pageviewsLast30Days = await db.collection('pageviews').countDocuments({ timestamp: { $gte: daysAgo(30) } });
    const pageviewsLast90Days = await db.collection('pageviews').countDocuments({ timestamp: { $gte: daysAgo(90) } });

    const submissionCount = await db.collection('submissions').countDocuments();

    return {
      pageviewsLast7Days,
      pageviewsLast30Days,
      pageviewsLast90Days,
      submissionCount,
    };
  } catch (error) {
    console.error('Failed to fetch analytics summary:', error);
    return { pageviewsLast7Days: 0, pageviewsLast30Days: 0, pageviewsLast90Days: 0, submissionCount: 0 };
  }
}

export async function getDetailedStatistics() {
  try {
    const query = groq`*[_type == "detailedStatistics"][0]{
      title,
      stats
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch detailed statistics:', error);
    return { title: 'Our Impact', stats: [] };
  }
}

export async function getMoreServicesData(): Promise<MoreServicesData | null> {
  try {
    const query = groq`*[_type == "servicesManagement"][0]{
      "title": aboutPageSectionTitle,
      "backgroundImage": aboutPageBackgroundImage,
      "services": aboutPageServices[]->{...}
    }`;
    return await client.fetch<MoreServicesData>(query, {}, {cache: 'no-store'});
  } catch (error) {
    console.error('Failed to fetch "More Services" section data:', error);
    return null;
  }
}

export async function getGalleryPageData() {
  try {
    const query = groq`*[_type == "galleryPage"][0]`;
    return await client.fetch(query, {}, {cache: 'no-store'});
  } catch (error) {
    console.error('Failed to fetch gallery page data:', error);
    return null;
  }
}

export async function getGalleryCustomers() {
  try {
    const query = groq`*[_type == "galleryCustomer"] | order(order asc, _createdAt desc) {
      _id,
      name,
      backgroundImage,
      mediaItems[]{
        ...,
        "videoUrl": asset->url
      }
    }`;
    return await client.fetch(query, {}, {cache: 'no-store'});
  } catch (error) {
    console.error('Failed to fetch gallery customers:', error);
    return [];
  }
}
