'use client'

import {StrategyStep} from '@/lib/types'
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StrategySectionProps {
  data: {
    title: string
    steps: StrategyStep[];
  } | null
}

export default function StrategySection({data}: StrategySectionProps) {
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.5, ease: 'circOut', delay: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  if (!data || !data.steps || data.steps.length === 0) {
    return null
  }

  const {title, steps} = data

  return (
    <div ref={ref} className="bg-black min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32">
      <motion.div className="mx-auto max-w-7xl px-6 lg:px-8" initial="hidden" animate={controls}>
        <div className="mx-auto max-w-4xl lg:text-center">
          <motion.h2 variants={headlineVariants} className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {title}
          </motion.h2>
        </div>
        <div className="relative mx-auto mt-16 max-w-4xl lg:mt-24">
          {/* Central Timeline */}
          <div className="absolute left-10 top-0 h-full w-0.5 bg-gray-700 lg:left-1/2 lg:-ml-px" aria-hidden="true" />
          <motion.div variants={containerVariants} className="relative flex flex-col gap-y-12">
            {steps.map((step, index) => (
              <motion.div
                variants={itemVariants}
                key={step._key}
                className={`group relative flex items-center lg:justify-start ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Number Circle */}
                <div
                  className={`absolute left-10 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-900 transition-colors duration-300 group-hover:border-indigo-500 lg:left-1/2`}
                >
                  <div className="absolute h-full w-full rounded-full bg-indigo-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50" />
                  <span className="text-3xl font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                </div>

                {/* Content Box */}
                <div
                  className={`w-full rounded-lg bg-gray-900/50 p-6 ring-1 ring-white/10 backdrop-blur-sm ml-28 lg:ml-0 lg:w-[calc(50%-4rem)] ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                  {step.description && (
                    <p className="mt-2 text-lg leading-8 text-gray-400">{step.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}