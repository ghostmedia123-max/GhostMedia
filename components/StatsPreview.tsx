'use client';

import { Statistic } from '@/lib/types';
import { motion, useInView, useAnimationControls, Variants, animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import {
  ChartBarIcon,
  ChartPieIcon,
  UsersIcon,
  TrophyIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  SparklesIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/outline';

interface StatsPreviewProps {
  data: Statistic[];
}

const iconMap: { [key: string]: React.ElementType } = { ChartBarIcon, ChartPieIcon, UsersIcon, TrophyIcon, RocketLaunchIcon, LightBulbIcon, CheckBadgeIcon, CurrencyDollarIcon, Cog6ToothIcon, SparklesIcon, MegaphoneIcon };

function AnimatedNumber({ to, suffix }: { to: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const numberValue = parseInt(to.replace(/,/g, ''), 10);

      if (isNaN(numberValue)) {
        node.textContent = to;
        return;
      }

      const controls = animate(0, numberValue, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString();
        },
      });

      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <>
      <span ref={ref}>{to}</span>
      {suffix}
    </>
  );
}

export default function StatsPreview({ data }: StatsPreviewProps) {
  // Use the data passed in via props, which is fetched on the server page.
  const stats: Statistic[] = data || [];
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
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // This was duplicated, keeping the more fine-tuned value
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section ref={ref} className="bg-black py-12 sm:py-16 overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="mx-auto max-w-2xl lg:text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Our Impact in Numbers
            </h2>
          </div>
          {stats.length > 0 ? (
            <dl className="grid grid-cols-1 gap-y-10 text-center lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {stats.map((stat: Statistic, index) => ( // Use stat._key if available, otherwise fallback to index
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate={controls}
                  key={stat.label || index}
                  className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0px 10px 30px rgba(59, 130, 246, 0.3)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  {stat.icon && iconMap[stat.icon] && (
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 mb-4 ring-4 ring-gray-800">
                      {React.createElement(iconMap[stat.icon], { className: 'h-8 w-8 text-white' })}
                    </div>
                  )}
                  <dd className="text-5xl font-semibold tracking-tight text-white">
                    <AnimatedNumber to={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="mt-2 text-base leading-7 text-gray-400">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          ) : (
            <div className="text-center text-gray-500">
              <p>Key statistics will be displayed here soon.</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}