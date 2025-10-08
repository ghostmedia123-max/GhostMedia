import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsBeacon from "@/components/AnalyticsBeacon";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NextAuthProvider } from '@/components/Providers';
import { getFooterData } from "@/lib/data";
import SiteWrapper from "@/components/SiteWrapper";

const siteConfig = {
  name: 'GhostMedia - Production-Ready Websites',
  description: 'A CMS-driven website built with Next.js, Sanity, and Vercel.',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: '%s | GhostMedia',
    default: 'GhostMedia - Production-Ready Websites',
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    // Add a default social sharing image:
    // images: [
    //   {
    //     url: `${siteConfig.url}/og-image.png`,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Provide a fallback empty object to prevent crashes if no contact info is found.
  const footerData = (await getFooterData()) || {};

  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <SiteWrapper footerData={footerData}>
            {children}
          </SiteWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}