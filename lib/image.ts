import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import { SanityImage } from './types';

// Create an image URL builder instance from the Sanity client
const builder = imageUrlBuilder(client);

/**
 * A helper function to generate image URLs from Sanity image assets.
 * @param source The Sanity image object
 * @returns An image URL builder instance
 */
export function urlForImage(source: SanityImage) {
  return builder.image(source);
}