'use client';

import { Service } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ServicesGridProps {
  data: Service[];
}

export default function ServicesGrid({ data }: ServicesGridProps) {
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
    <section ref={ref} className="bg-[#000c49] py-12 sm:py-16 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            variants={headlineVariants}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Our Services
          </motion.h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {data && data.length > 0 ? (
              data.map((service, index) => ( // Use service.number as key, fallback to index
                <motion.div
                  key={service.number}
                  variants={itemVariants}
                  className="group relative cursor-pointer pl-16"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 transition-all duration-300 group-hover:bg-indigo-500 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.8)]">
                      <span className="text-2xl font-bold">{String(service.number).padStart(2, '0')}</span>
                    </div>
                    {service.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-400">
                    {service.description}
                  </dd>
                </motion.div>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-3 text-center text-gray-500">
                <p>Our services will be listed here soon.</p>
              </div>
            )}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}