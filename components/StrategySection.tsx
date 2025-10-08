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
        staggerChildren: 0.15, // This was duplicated, keeping the more fine-tuned value
        delayChildren: 0.5, // Start animating steps after the line draws
      },
    },
  };

  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.6, ease: 'circOut', delay: 0.2 }, // This was duplicated, keeping the more fine-tuned value
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, rotateX: -90, y: 50 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  if (!data || !data.steps || data.steps.length === 0) {
    return null
  }

  const {title, steps} = data

  return (
    <div ref={ref} className="bg-black min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        initial="hidden"
        animate={controls}
      >
        <div className="mx-auto max-w-4xl lg:text-center">
          <motion.h2 variants={headlineVariants} className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</motion.h2>
        </div>
        <div className="mx-auto mt-16 max-w-none lg:mt-24">
          <motion.div variants={containerVariants} className="relative grid w-full grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
            {/* Connecting arrows for desktop */}
            <motion.div
              variants={lineVariants}
              className="absolute inset-x-0 top-10 hidden h-px -translate-y-1/2 bg-gray-700 lg:block"
              aria-hidden="true"
            />
            {steps.map((step, index) => (
              <motion.div
                variants={itemVariants}
                key={step._key}
                className="group relative flex cursor-pointer flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-900 transition-colors duration-300 group-hover:border-indigo-500">
                  {/* Glowing effect on hover */}
                  <div
                    className="absolute h-full w-full rounded-full bg-indigo-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
                    aria-hidden="true"
                  />
                  <span className="text-3xl font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-6">
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