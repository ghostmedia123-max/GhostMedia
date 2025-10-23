import { getContactInfo, getHeaderHeroData } from '@/lib/data';
import { ContactInfoData, HeaderHeroData, SanitySeo } from '@/lib/types';
import { Metadata } from 'next';
import HeaderHero from '@/components/HeaderHero';
import ContactClient from '@/components/ContactClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  // const contactHeroData: ContactHeroData = (await getContactHeroData()) || {};
  const title = 'Contact Us';
  const description = 'Get in touch with us for any questions or project inquiries.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  const [contactInfo, headerHeroData] = await Promise.all([
    getContactInfo(),
    getHeaderHeroData('contact'),
  ]);
  const heroData = headerHeroData || { _type: 'headerHero' };

  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Structured data for local business SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GhostMedia',
    url: siteUrl,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    // Add your logo URL if available
    // "logo": `${siteUrl}/logo.png`,
  };

  return (
    <div className="flex flex-col">
      {/* Add JSON-LD to the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeaderHero data={heroData} />

      {contactInfo && (
        <ContactClient contactInfo={contactInfo} />
      )}
    </div>
  );
}
