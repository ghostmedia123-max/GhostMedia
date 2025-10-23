'use client';

import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { ContactInfoData } from '@/lib/types';
import ContactForm from '@/components/ContactForm';

interface ContactClientProps {
  contactInfo: ContactInfoData;
}

// A simple icon map for social networks
const SocialIcons = {
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

export default function ContactClient({ contactInfo }: ContactClientProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.2, // Stagger the left and right columns
      },
    },
  };

  const columnVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div ref={ref} className="bg-black">
      <motion.div
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          variants={headlineVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{contactInfo.mainHeadline || "Let's Connect"}</h2>
          <p className="mt-2 text-lg leading-8 text-gray-300">{contactInfo.subHeadline || 'Use the form to send us a message, or reach out directly using the details below.'}</p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          className="mx-auto mt-16 max-w-xl rounded-lg bg-gradient-to-br from-[#000c49] via-[#000729] to-black p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:mt-20 lg:max-w-2xl lg:p-12"
        >
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-12">
            <motion.div variants={columnVariants}>
              <h3 className="text-2xl font-semibold text-white">{contactInfo.infoBoxTitle || 'Contact Information'}</h3>
              <div className="mt-6 space-y-4 text-base leading-7 text-gray-300">
                {contactInfo.phone && (
                  <div className="flex gap-x-4">
                    <span className="flex-shrink-0">Phone:</span>
                    <span className="break-all">{contactInfo.phone}</span>
                  </div>
                )}
                {contactInfo.email && (
                  <div className="flex gap-x-4">
                    <span className="flex-shrink-0">Email:</span>
                    <a href={`mailto:${contactInfo.email}`} className="break-all hover:text-white">
                      {contactInfo.email}
                    </a>
                  </div>
                )}
              </div>
              <div className="mt-10 border-t border-white/10 pt-10">
                <h3 className="text-lg font-semibold text-white">{contactInfo.socialsTitle || 'Follow Us'}</h3>
                <div className="mt-4 flex flex-col items-start space-y-4">
                  {(contactInfo.socialLinks || []).map((item) => {
                    const Icon = SocialIcons[item.network.charAt(0).toUpperCase() + item.network.slice(1) as keyof typeof SocialIcons];
                    return React.createElement(
                      motion.a,
                      {
                        key: item.network,
                        href: item.url,
                        className: 'flex items-center gap-x-3 text-base text-gray-300 hover:text-white',
                        whileHover: { scale: 1.1, x: 5 },
                        transition: { type: 'spring', stiffness: 400, damping: 15 },
                      },
                      Icon ? React.createElement(Icon, { className: 'h-6 w-6' }) : React.createElement('span', { className: 'h-6 w-6' }),
                      React.createElement('span', null, item.network)
                    )
                  })}
                </div>
              </div>
            </motion.div>
            <motion.div variants={columnVariants}>
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}