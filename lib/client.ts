import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from './types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CND for faster response times. Set to false if you need draft content.
  useCdn: false,
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: SanityImage) {
  return builder.image(source);
}