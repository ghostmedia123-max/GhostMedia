'use client'

import {DetailedStat, SubStat, DescriptionBox, DetailedStatisticsData} from '../lib/types'
import {motion, useInView, useAnimationControls, Variants, animate} from 'framer-motion'
import React, {useEffect, useRef} from 'react'
import {ArrowTrendingUpIcon} from '@heroicons/react/24/solid'

interface DetailedStatisticsProps {
  data: DetailedStatisticsData | null | undefined;
}

const containerVariants: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function AnimatedNumber({to, suffix = ''}: {to: string; suffix?: string}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, {amount: 0.5})

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current
      const numberValue = parseFloat(to.replace(/,/g, ''))

      if (isNaN(numberValue)) {
        node.textContent = to
        return
      }

      const controls = animate(0, numberValue, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = value.toLocaleString('en-US', {
            maximumFractionDigits: to.includes('.') ? 1 : 0,
          })
        },
      })

      return () => controls.stop()
    }
  }, [isInView, to])

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  )
}

const ringContentVariants: Variants = {
  initial: {opacity: 0},
  hover: {opacity: 1, transition: {delay: 0.1}},
}

function ProgressRing({primary, secondary}: {primary: number; secondary: number}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 0.5})
  const primaryControls = useAnimationControls()
  const radius = 36
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (isInView) {
      primaryControls.start({
        strokeDashoffset: circumference * (1 - (primary || 0) / 100),
        transition: {duration: 1, ease: 'easeOut'},
      })
    } else {
      // Reset animations when out of view
      primaryControls.start({strokeDashoffset: circumference, transition: {duration: 0}})
    }
  }, [isInView, primary, circumference, primaryControls])

  return (
    <motion.div
      ref={ref}
      className="relative h-20 w-20"
      initial="initial" // Sets the initial variant for children
      whileHover="hover" // On hover, animates children to their "hover" variant
      transition={{type: 'spring', stiffness: 300}}
    >
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        variants={ringContentVariants}
      >
        <span className="text-xl font-bold text-white">{primary}%</span>
      </motion.div>
      <svg className="h-full w-full" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#1f2937" strokeWidth="8" />
        {/* Blue/Secondary arc - drawn first to fill the whole ring */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        {/* White/Primary arc - drawn on top of the blue one */}
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          strokeDasharray={circumference}
          animate={primaryControls}
          initial={{strokeDashoffset: circumference}}
        />
      </svg>
    </motion.div>
  )
}

export default function DetailedStatistics({data}: DetailedStatisticsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 0.1})

  return (
    <div ref={ref} className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{data?.title || 'Our Impact'}</h2>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-2xl space-y-8 lg:max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {!data?.stats || data.stats.length === 0 ? (
            <motion.div variants={itemVariants} className="text-center text-gray-400">
              <p>No statistics have been added. Please add statistics in the CMS.</p>
            </motion.div>
          ) : (
            data.stats.map(stat => (
            <motion.div
              key={stat._key}
              variants={itemVariants}
              whileHover={{scale: 1.03, transition: {type: 'spring', stiffness: 300}}}
              className="rounded-xl bg-[#000c49]/50 p-6 ring-1 ring-white/10"
            >
              <div className="flex flex-col gap-y-6 sm:flex-row sm:items-start sm:justify-between sm:gap-x-8">
                <div className="flex flex-1 items-start gap-x-6">
                  {stat.progressRing && (
                    <div className="flex flex-shrink-0 items-center gap-x-4">
                      <ProgressRing primary={stat.progressRing.primaryValue} secondary={stat.progressRing.secondaryValue} />
                      <div className="text-sm">
                        <p className="flex items-center gap-x-2 text-white"><span className="h-2 w-2 rounded-full bg-white"></span> {stat.progressRing.primaryLabel}</p>
                        <p className="flex items-center gap-x-2 text-gray-400"><span className="h-2 w-2 rounded-full bg-blue-500"></span> {stat.progressRing.secondaryLabel}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                      <AnimatedNumber to={stat.mainValue} suffix={stat.suffix} />
                    </p>
                    <div className="mt-2 flex items-center gap-x-2">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />
                      <span className="text-sm font-medium text-green-400">+{stat.percentageGrowth.toLocaleString()}%</span>
                      <span className="text-sm text-gray-500">{stat.previousValue}</span>
                    </div>
                  </div>
                </div>
                {stat.descriptionBoxes && stat.descriptionBoxes.length > 0 && (
                  <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                    {stat.descriptionBoxes.map(box => (
                      <motion.div
                        key={box._key}
                        whileHover={{y: -4, backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
                        className="rounded-lg bg-white/5 p-4"
                      >
                        <p className="font-semibold text-white">{box.title}</p>
                        <p className="mt-1 text-sm text-gray-300">{box.text || ''}</p>
                      </motion.div>
                    ))}
                    </div>
                )}
              </div>
              {stat.subStats && stat.subStats.length > 0 && (
                <div className="mt-6 rounded-lg bg-white/5 p-4 ring-1 ring-inset ring-white/10">
                  <div className="flex flex-wrap items-center justify-around gap-4">
                    {stat.subStats.map(sub => (
                      <motion.div
                        key={sub._key}
                        whileHover={{scale: 1.1, y: -5}}
                        transition={{type: 'spring', stiffness: 300}}
                        className="flex flex-col items-center text-center"
                      >
                        <p className="text-sm text-gray-400">{sub.label}</p>
                        <p className="mt-1 text-xl font-semibold text-white">{sub.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))
          )}
        </motion.div>
      </div>
    </div>
  )
}