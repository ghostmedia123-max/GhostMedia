'use client';

import Link from 'next/link';
import { urlFor } from '@/lib/client';
import Image from 'next/image';
import { SanityImage, HeroData } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface HeroProps {
  data: HeroData;
}

export default function Hero({data}: HeroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
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
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  return (
    <section
      ref={ref}
      className="relative flex h-screen items-center justify-center bg-[#000c49] text-white overflow-hidden"
    >
      {data.backgroundImage?.asset && (
        <Image
          src={urlFor(data.backgroundImage).url()}
          alt={data.backgroundImage.alt || 'Hero background image'}
          fill
          className="object-cover w-full h-full"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text readability */}
      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left">
          {data.logo?.asset && (
            <motion.div
              variants={itemVariants}
              className="relative mb-6 flex-shrink-0 md:mb-0 md:mr-8"
            >
              {/* Animated Border */}
              <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="calc(50% - 2px)"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    stroke: ['#000000', '#f9f9f9', '#000000'],
                  }}
                  transition={{
                    pathLength: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    stroke: { duration: 4, repeat: Infinity, ease: 'linear' },
                  }}
                />
              </svg>
              <Image
                src={urlFor(data.logo).width(400).height(400).url()}
                alt={data.logo.alt || 'Company Logo'}
                width={400}
                height={400}
                className="h-48 w-48 object-contain md:h-[400px] md:w-[400px]"
              />
            </motion.div>
          )}
          <div className="max-w-2xl">
            <motion.h1 variants={itemVariants} className="mb-4 text-5xl font-bold md:text-7xl lg:text-8xl">
              {data.headline || 'Welcome'}
            </motion.h1>
            {data.subtext && (
              <motion.p variants={itemVariants} className="mb-4 text-lg text-gray-300 md:text-xl">
                {data.subtext}
              </motion.p>
            )}
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 z-10 text-center">
          {data.tagline && (
            <motion.p variants={itemVariants} className="mb-8 px-4 text-lg md:text-xl">{data.tagline}</motion.p>
          )}
          {data.ctaText && data.ctaLink && (
            <motion.div variants={itemVariants}>
              <Link href={data.ctaLink} className="rounded bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-600">
                {data.ctaText}
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
