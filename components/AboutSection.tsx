'use client';

import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import { SanityImage } from '@/lib/types';

interface AboutSectionProps {
  section: {
    _key: string;
    title: string;
    text: string;
    backgroundImage?: SanityImage;
  };
  index: number;
  color: string;
}

export default function AboutSection({ section, index, color }: AboutSectionProps) {
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

  const layoutType = index % 3;

  const centeredVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const getLayout = () => {
    switch (layoutType) {
      case 0: // Centered
        return ( // prettier-ignore
          <motion.div variants={centeredVariants} className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{section.title}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">{section.text}</p>
          </motion.div>
        );
      case 1: // Text on the left
        return (
          <motion.div variants={leftVariants} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{section.title}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">{section.text}</p>
              </div>
            </div>
          </motion.div>
        );
      case 2: // Text on the right
      default:
        return (
          <motion.div variants={rightVariants} className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
            <div className="lg:col-start-2 lg:pl-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{section.title}</h2>
                <p className="mt-6 text-lg leading-8 text-gray-300">{section.text}</p>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor: color }}
      className="relative overflow-hidden py-24 sm:py-32"
      initial="hidden"
      animate={controls}
    >
      {section.backgroundImage?.asset && (
        <Image
          src={urlFor(section.backgroundImage).url()}
          alt={section.backgroundImage.alt || 'Section background'}
          layout="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {section.backgroundImage?.asset && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">{getLayout()}</div>
    </motion.div>
  );
}