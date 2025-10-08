'use client';

import { IntroductionData } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface IntroductionProps {
  data: IntroductionData;
}

export default function Introduction({data}: IntroductionProps) {
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
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const leftItemVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const rightItemVariants: Variants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  if (!data) {
    return null;
  }

  return (
    <div ref={ref} className="bg-black min-h-screen flex items-start pt-32 sm:items-center sm:pt-0 justify-center overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Centered Headline */}
        <div className="mx-auto max-w-4xl lg:text-center">
          <motion.h2
            variants={headlineVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {data.headline || 'Our Mission'}
          </motion.h2>
        </div>

        {/* Two-column layout for text */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:mt-16 md:text-lg md:leading-8">
          <motion.div
            variants={leftItemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group cursor-pointer rounded-2xl p-6 transition-colors duration-300 hover:bg-white/5 md:p-8"
          >
            <p className="transition-colors duration-300 group-hover:text-white">{data.leftColumn}</p>
          </motion.div>
          <motion.div
            variants={rightItemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group cursor-pointer rounded-2xl p-6 transition-colors duration-300 hover:bg-white/5 md:p-8"
          >
            <p className="transition-colors duration-300 group-hover:text-white">{data.rightColumn}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}