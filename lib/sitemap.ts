import { MetadataRoute } from 'next';
import { client } from '@/lib/client'; // Correct import path
import { groq } from 'next-sanity';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface Page {
  _updatedAt: string;
  slug: {
    current: string;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all page slugs from Sanity
  const pages: Page[] = await client.fetch(
    groq`*[_type == "page" && defined(slug.current)]{ _updatedAt, slug }`
  );

  const pageUrls = pages.map((page) => ({
    url: `${BASE_URL}/${page.slug.current === 'home' ? '' : page.slug.current}`,
    lastModified: page._updatedAt,
  }));

  // Add static pages
  const staticUrls = [
    { url: BASE_URL, lastModified: new Date() },
    // Add other static routes like /contact if they are not in Sanity
  ];

  return [...staticUrls, ...pageUrls];
}