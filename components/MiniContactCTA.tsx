'use client';

import Link from 'next/link';
import { motion, useInView, useAnimationControls, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function MiniContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const cardVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div ref={ref} className="relative isolate overflow-hidden bg-black px-6 py-48 sm:py-56 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          className="relative rounded-lg bg-gray-900/80 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg"
          variants={cardVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Animated Border using an SVG rect */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none">
            <motion.rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="7" // Corresponds to rounded-lg
              ry="7"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                stroke: ['#000c49', '#001584', '#f9f9f9', '#000729'],
              }}
              transition={{
                pathLength: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                stroke: { duration: 4, repeat: Infinity, ease: 'linear' },
              }}
              strokeWidth="2"
            />
          </svg>

          <div className="relative z-10">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start a project?
              <br />
              Let's talk.
            </motion.h2>
            <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get in touch
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}