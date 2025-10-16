export interface SanityImage {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
}

export interface AboutSection {
  _key: string;
  title: string;
  text: any; // Using 'any' for Portable Text, can be replaced with a more specific type
  sections?: any[]; // Assuming sections can be nested
}

// Define a local type for this page's specific data needs
export interface AboutPageData {
  headline: string;
  sections: AboutSection[];
  seo?: SanitySeo;
}

export interface Statistic {
  _key?: string; // Sanity automatically adds _key to array items
  label: string;
  icon?: string;
  value: string;
  suffix?: string;
  description?: string;

}

export interface PortfolioItem {
  _id: string;
  title: string;
  description?: string;
  image: SanityImage;
  videoUrl?: string;
  featured?: boolean;
}

export interface Service {
  number: number;
  title: string;
  description: string;
  shortDescription?: string;
  icon?: string;
  features?: string[];
  serviceIcon?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesSectionData {
  title?: string;
  description?: string;
  backgroundImage?: SanityImage;
}

export interface ContactInfoData {
  mainHeadline?: string;
  subHeadline?: string;
  infoBoxTitle?: string;
  socialsTitle?: string;
  email?: string;
  phone?: string;
  socialLinks?: { network: string; url: string }[];
  mapUrl?: string;
}

export interface IntroductionData {
  headline?: string;
  leftColumn?: string;
  rightColumn?: string;
}

export interface HeroData {
  headline: string;
  tagline?: string;
  backgroundImage?: SanityImage;
  logo?: SanityImage;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  seo?: SanitySeo;
}

export interface Submission {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Tool {
  _key: string;
  image: SanityImage;
  text?: string;
}

export interface ToolsSectionData {
  title: string;
  description?: string;
  backgroundImage?: SanityImage;
  tools: Tool[];
}

export interface StrategyStep {
  _key: string;
  title: string;
  description?: string;
}

export interface GalleryItem {
  _id: string;
  title?: string;
  mediaUrl: string;
  mediaType: string; // Will be something like 'image/jpeg' or 'video/mp4'
}

export interface GallerySectionData {
  title?: string;
  description?: string;
}

export interface FooterData {
  siteName?: string;
  siteIcon?: SanityImage;
  description?: string;
  socialLinks?: { network: string; url: string }[];
  privacyPolicySlug?: string;
  termsOfServiceSlug?: string;
}

export interface CarouselSlide {
  _key: string;
  image: SanityImage;
  headline?: string;
}

export interface CarouselData {
  title?: string;
  description?: string;
  featureFirstSlide?: boolean;
  slides: CarouselSlide[];
}

export interface SubStat {
  _key: string;
  label: string;
  value: string;
}

export interface DetailedStat {
  _key: string;
  label: string;
  mainValue: string;
  percentageGrowth: number;
  previousValue?: string;
  progressRing?: {
    primaryValue: number;
    primaryLabel: string;
    secondaryValue: number;
    secondaryLabel: string;
  };
  subStats?: SubStat[];
  descriptionBoxes?: DescriptionBox[];
}

export interface DescriptionBox {
  _key: string;
  title: string;
  text: string;
}

export interface SanityVideo {
  _key: string;
  _type: 'videoItem';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  videoUrl?: string;
}

export type CustomerGalleryItem = SanityImage | SanityVideo;

export interface CustomerGallerySectionData {
  title?: string;
  backgroundImage?: SanityImage;
}