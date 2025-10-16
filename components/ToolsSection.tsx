'use client'

import {ToolsSectionData} from '@/lib/types'
import {urlFor} from '@/lib/client'
import Image from 'next/image'
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ToolsSectionProps {
  data: ToolsSectionData | null
}

export default function ToolsSection({data}: ToolsSectionProps) {
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

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // This was duplicated, keeping the more fine-tuned value
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

  const toolsBoxVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delayChildren: 0.2, // Wait for box to zoom in before dropping logos
        staggerChildren: 0.1,
      },
    },
  };

  const logoItemVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (!data || !data.tools || data.tools.length === 0) {
    return null
  }

  const {title, description, tools, backgroundImage} = data

  return (
    <div ref={ref} className="relative bg-[#000c49] py-24 sm:py-32 overflow-hidden">
      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).url()}
          alt={backgroundImage.alt || 'Tools section background'}
          layout="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={headlineVariants} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
          {description && <p className="mt-6 text-lg leading-8 text-gray-300">{description}</p>}
        </motion.div>
        <motion.div
          variants={toolsBoxVariants}
          className="mt-16 rounded-xl bg-[#000c49] p-8 lg:p-12"
        >
          <div className="relative z-10 mx-auto flex flex-wrap items-center justify-center gap-8">
            {tools.map((tool) => (
              <motion.div
                variants={logoItemVariants}
                key={tool._key}
                className="flex flex-col items-center justify-center gap-y-4 p-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <div className="relative h-32 w-48">
                  <Image
                  src={urlFor(tool.image).url()}
                  alt={tool.image.alt || tool.text || 'Tool logo'}
                    fill
                    className="object-contain"
                  style={{ filter: 'grayscale(100%)', transition: 'filter 300ms' }}
                  onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                  onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}