'use client';

import { Service, ServicesSectionData } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/client';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  CameraIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';

const iconMap: { [key: string]: React.ElementType } = {
  Cog: Cog6ToothIcon,
  ChartBar: ChartBarIcon,
  ComputerDesktop: ComputerDesktopIcon,
  PaintBrush: PaintBrushIcon,
  Megaphone: MegaphoneIcon,
  Camera: CameraIcon,
  CodeBracket: CodeBracketIcon,
};

interface ServicesGridProps {
  services: Service[];
  sectionData: ServicesSectionData | null;
}

export default function ServicesGrid({ services, sectionData }: ServicesGridProps) {
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
        delayChildren: 0.3,
        staggerChildren: 0.15, // This was duplicated, keeping the more fine-tuned value
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="relative bg-[#000c49] py-12 sm:py-16 overflow-hidden">
      {sectionData?.backgroundImage && (
        <Image
          src={urlFor(sectionData.backgroundImage).url()}
          alt={sectionData.backgroundImage.alt || 'Services section background'}
          layout="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {sectionData?.backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            variants={headlineVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {sectionData?.title || 'Our Services'}
          </motion.h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services && services.length > 0 ? (
              services.map((service) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group flex items-start gap-x-6 rounded-xl bg-white/5 p-6 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:ring-white/20"
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Numbered Box */}
                  {service.serviceNumber && (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-3xl font-bold text-white transition-all duration-300 group-hover:bg-indigo-500 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.8)]">
                      {service.serviceNumber}
                    </div>
                  )}
                  {/* Text content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold leading-7 text-white">{service.title}</h3>
                    <p className="mt-1 text-base leading-7 text-gray-400">{service.shortDescription}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-3 text-center text-gray-500">
                <p>Our services will be listed here soon.</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}