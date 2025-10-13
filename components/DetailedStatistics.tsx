'use client'

import {DetailedStat, SubStat} from '@/lib/types'
import {motion, useInView, useAnimationControls, Variants, animate} from 'framer-motion'
import React, {useEffect, useRef} from 'react'
import {ArrowTrendingUpIcon} from '@heroicons/react/24/solid'

interface DetailedStatisticsProps {
  data: {
    title?: string
    stats: DetailedStat[]
  }
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
  const isInView = useInView(ref, {once: true, amount: 0.5})

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
      <span ref={ref}>{to}</span>
      {suffix}
    </>
  )
}

function ProgressRing({primary, secondary}: {primary: number; secondary: number}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.5})
  const primaryControls = useAnimationControls()
  const secondaryControls = useAnimationControls()
  const radius = 36
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (isInView) {
      primaryControls.start({
        strokeDashoffset: circumference * (1 - primary / 100),
        transition: {duration: 1, ease: 'easeOut'},
      })
      secondaryControls.start({
        strokeDashoffset: circumference * (1 - (primary + secondary) / 100),
        transition: {duration: 1, ease: 'easeOut'},
      })
    }
  }, [isInView, primary, secondary, circumference, primaryControls, secondaryControls])

  return (
    <div ref={ref} className="relative h-20 w-20">
      <svg className="h-full w-full" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="transparent" stroke="#1f2937" strokeWidth="8" />
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
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth="8"
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          strokeDasharray={circumference}
          animate={secondaryControls}
          initial={{strokeDashoffset: circumference}}
        />
      </svg>
    </div>
  )
}

export default function DetailedStatistics({data}: DetailedStatisticsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.1})

  return (
    <div ref={ref} className="bg-[#000729] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{data.title || 'Our Impact'}</h2>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-2xl space-y-8 lg:max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {data.stats.map(stat => (
            <motion.div key={stat._key} variants={itemVariants} className="rounded-xl bg-[#000c49]/50 p-6 ring-1 ring-white/10">
              <div className="flex flex-col gap-y-6 sm:flex-row sm:items-center sm:justify-between sm:gap-x-8">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-white">
                    <AnimatedNumber to={stat.mainValue} />
                  </p>
                  <div className="mt-2 flex items-center gap-x-2">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-green-400">+{stat.percentageGrowth.toLocaleString()}%</span>
                    <span className="text-sm text-gray-500">{stat.previousValue}</span>
                  </div>
                </div>
                {stat.progressRing && (
                  <div className="flex flex-shrink-0 items-center gap-x-4">
                    <ProgressRing primary={stat.progressRing.primaryValue} secondary={stat.progressRing.secondaryValue} />
                    <div className="text-sm">
                      <p className="flex items-center gap-x-2 text-white"><span className="h-2 w-2 rounded-full bg-white"></span>{stat.progressRing.primaryLabel}</p>
                      <p className="flex items-center gap-x-2 text-gray-400"><span className="h-2 w-2 rounded-full bg-blue-500"></span>{stat.progressRing.secondaryLabel}</p>
                    </div>
                  </div>
                )}
              </div>
              {stat.subStats && stat.subStats.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                  {stat.subStats.map(sub => (
                    <div key={sub._key} className="rounded-lg bg-white/5 p-4">
                      <p className="text-sm text-gray-400">{sub.label}</p>
                      <p className="mt-1 text-xl font-semibold text-white">{sub.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}