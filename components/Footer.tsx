'use client';

import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import { FooterData } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// SVG Icon components for social media
const SocialIcons: { [key: string]: React.ElementType } = {
  Facebook: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>
  ),
  Twitter: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.49-1.74.85-2.7 1.04C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.01-.06C3.8 19.53 6.03 20 8.5 20c7.3 0 11.29-6.06 11.29-11.29l-.01-.51c.78-.57 1.45-1.28 1.98-2.08z" /></svg>
  ),
  Instagram: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
  ),
  LinkedIn: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
  ),
};

const SecurityIcons = {
  SSL: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
  ),
  Encryption: (props: any) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
  ),
};

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const pathname = usePathname();
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const {siteName, siteIcon, description, socialLinks, privacyPolicySlug, termsOfServiceSlug} = data

  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Content', href: '/content' },
      { name: 'Contact', href: '/contact' },
    ],
    security: [
      { name: 'SSL Secured', Icon: SecurityIcons.SSL },
      { name: 'Data Encryption', Icon: SecurityIcons.Encryption },
    ],
    legal: [],
  };

  return (
    <footer ref={ref} className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <motion.div
        className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-center space-x-3">
              {siteIcon?.asset && (
                <Image
                  src={urlFor(siteIcon).width(40).height(40).url()}
                  alt={siteIcon.alt || 'Site Icon'}
                  width={40}
                  height={40}
                />
              )}
              <span className="text-xl font-bold text-white">{siteName || 'GhostMediaTT'}</span>
            </div>
            <p className="text-sm leading-6 text-gray-300">{description}</p>
            <div className="flex space-x-6">
              {(socialLinks || []).map((item) => {
                // Find the icon key in a case-insensitive way
                const iconKey = Object.keys(SocialIcons).find(key => key.toLowerCase() === item.network.toLowerCase());
                const Icon = iconKey ? SocialIcons[iconKey] : null;

                return (
                  <a key={item.network} href={item.url} className="text-gray-500 transition-transform duration-200 hover:scale-110 hover:text-white">
                    <span className="sr-only">{item.network}</span>
                    {Icon ? <Icon className="h-6 w-6" /> : <span>{item.network.charAt(0).toUpperCase()}</span>}
                  </a>
                );
              })}
            </div>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-3 xl:col-span-3 xl:mt-0">
            {/* This empty div acts as a spacer on larger screens */}
            <div className="hidden sm:block"></div>
            <motion.div variants={itemVariants}>
              <h3 className="text-base font-semibold leading-6 text-white">Navigation</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className={`inline-block rounded-md px-2.5 py-1 text-base leading-6 transition-colors duration-200 ease-in-out hover:text-white ${pathname === item.href ? 'font-semibold text-white' : 'text-gray-300'}`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-base font-semibold leading-6 text-white">Security & Trust</h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.security.map((item) => (
                  <li key={item.name} className="flex items-center">
                    <item.Icon className="h-5 w-5 flex-shrink-0 text-green-400" aria-hidden="true" />
                    <span className="ml-3 text-base leading-6 text-gray-300">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-gray-400">&copy; {new Date().getFullYear()} GhostMediaTT. All rights reserved.</p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            {privacyPolicySlug && (
              <Link href={`/legal/${privacyPolicySlug}`} className="text-sm leading-6 text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
            )}
            {termsOfServiceSlug && (
              <Link href={`/legal/${termsOfServiceSlug}`} className="text-sm leading-6 text-gray-400 hover:text-white">
                Terms of Service
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
