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

interface AboutStatisticsProps {
  stats: Statistic[];
}

const iconMap: { [key: string]: React.ElementType } = { ChartBarIcon, ChartPieIcon, UsersIcon, TrophyIcon, RocketLaunchIcon, LightBulbIcon, CheckBadgeIcon, CurrencyDollarIcon, Cog6ToothIcon, SparklesIcon, MegaphoneIcon };

export default function AboutStatistics({ stats }: AboutStatisticsProps) {
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
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div ref={ref} className="bg-black py-24 sm:py-32 overflow-hidden">
      <motion.div className="mx-auto max-w-7xl px-6 lg:px-8" variants={containerVariants} initial="hidden" animate={controls}>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Trusted by creators worldwide</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              We are proud to have achieved these milestones with our amazing community.
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
            {stats?.map((stat: Statistic, index: number) => (
              <motion.div key={stat._key || index} variants={itemVariants}>
                <motion.div
                  className="flex flex-col items-center justify-start p-8 bg-gray-900 rounded-lg shadow-lg h-full"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    boxShadow: '0px 10px 30px rgba(59, 130, 246, 0.3)',
                    zIndex: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {stat.icon && iconMap[stat.icon] && (
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 mb-6 ring-4 ring-gray-800">
                      {React.createElement(iconMap[stat.icon], { className: 'h-8 w-8 text-white' })}
                    </div>
                  )}
                  <dl className="flex flex-col">
                    <dd className="order-first text-5xl font-semibold tracking-tight text-white">
                      <AnimatedNumber to={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dt className="mt-2 text-base leading-7 text-gray-400">{stat.label}</dt>
                    {stat.description && (
                      <motion.dd
                        className="mt-4 rounded-md bg-gray-800/50 p-4 ring-1 ring-white/10 text-sm leading-6 text-gray-500"
                        whileHover={{
                          scale: 1.08,
                          y: -5,
                          backgroundColor: 'hsl(229, 18%, 27%)', // --gray-700
                          color: 'hsl(0, 0%, 100%)', // --white
                        }}
                      >{stat.description}</motion.dd>
                    )}
                  </dl>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}