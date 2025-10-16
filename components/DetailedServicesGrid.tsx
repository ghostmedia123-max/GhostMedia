'use client';

import Link from 'next/link';
import { Service, ServicesSectionData } from '@/lib/types';
import React, { useRef, useEffect, useState } from 'react';
import {
  Cog6ToothIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  CameraIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/lib/client';

interface DetailedServicesGridProps {
  sectionData: ServicesSectionData | null;
  services: Service[];
}

const iconMap: { [key: string]: React.ElementType } = {
  Cog: Cog6ToothIcon,
  ChartBar: ChartBarIcon,
  ComputerDesktop: ComputerDesktopIcon,
  PaintBrush: PaintBrushIcon,
  Megaphone: MegaphoneIcon,
  Camera: CameraIcon,
  CodeBracket: CodeBracketIcon,
};

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function DetailedServicesGrid({ sectionData, services }: DetailedServicesGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.1, once: false }); // `once: false` is key for on/off scroll
  const controls = useAnimationControls();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // Small delay before cards start animating in
      },
    },
  };

  useEffect(() => {
    if (isInView) controls.start('visible');
    else controls.start('hidden');
  }, [isInView, controls]);

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      className="relative bg-[#000729] py-24 sm:py-32" // The ref is on the outermost div
      initial="hidden"
      animate={controls} // Controlled by useEffect
    >
      {sectionData?.backgroundImage && (
        <Image
          src={urlFor(sectionData.backgroundImage).url()}
          alt={sectionData.backgroundImage.alt || 'Services section background'}
          layout="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {sectionData?.backgroundImage && <div className="absolute inset-0 bg-black opacity-50" />}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {sectionData?.title || 'Our Services'}
          </h2>
          {sectionData?.description && (
            <p className="mt-6 text-lg leading-8 text-gray-300">{sectionData.description}</p>
          )}
        </motion.div>
        {/* This motion.div is the direct parent for the staggered cards */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 sm:mt-20"
          variants={containerVariants}
          // initial and animate are inherited from the parent `motion.div`
        >
          {services.map((service, index) => (
            <motion.div
              layout
              key={service.title}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === index ? 1.05 : (hoveredIndex !== null ? 0.95 : 1),
                opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
                zIndex: hoveredIndex === index ? 2 : 1,
                y: hoveredIndex === index ? -8 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex flex-col rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 lg:w-[calc(50%-1rem)]"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-x-4">
                  {service.serviceIcon && iconMap[service.serviceIcon] && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500">
                      {React.createElement(iconMap[service.serviceIcon], {
                        className: 'h-6 w-6 text-white',
                        'aria-hidden': 'true',
                      })}
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold leading-8 text-white">{service.title}</h3>
                </div>
                <div className="mt-6 flex flex-col justify-between md:flex-row md:gap-x-8">
                  {/* Left Column */}
                  <div className="flex-1">
                    <p className="text-base leading-7 text-gray-300">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Right Column */}
                  {service.shortDescription && (
                    <motion.div
                      className="mt-8 flex-shrink-0 rounded-2xl bg-gray-900/50 p-6 text-gray-700 ring-1 ring-indigo-500/20 md:mt-0 md:w-1/2"
                      whileHover={{
                        scale: 1.08,
                        y: -5,
                        backgroundColor: 'hsl(229, 18%, 27%)', // --gray-700
                        color: 'hsl(0, 0%, 100%)', // --white
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm leading-7">
                        {service.shortDescription}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
              {service.ctaText && service.ctaLink && (
                <Link href={service.ctaLink} className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {service.ctaText}
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
