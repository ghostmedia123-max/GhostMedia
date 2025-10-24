'use client'

import {MoreServicesData, Service} from '@/lib/types'
import Image from 'next/image'
import {urlFor} from '@/lib/client'
import {motion, useInView, useAnimationControls, Variants} from 'framer-motion'
import React, {useEffect, useRef} from 'react'
import Link from 'next/link'
import {
  Cog6ToothIcon,
  ChartBarIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  CameraIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'

const iconMap: {[key: string]: React.ElementType} = {
  Cog: Cog6ToothIcon,
  ChartBar: ChartBarIcon,
  ComputerDesktop: ComputerDesktopIcon,
  PaintBrush: PaintBrushIcon,
  Megaphone: MegaphoneIcon,
  Camera: CameraIcon,
  CodeBracket: CodeBracketIcon,
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

interface MoreServicesProps {
  data: MoreServicesData | null
}

export default function MoreServices({data}: MoreServicesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {amount: 0.1, once: false})
  const controls = useAnimationControls()

  const containerVariants: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.2, delayChildren: 0.2}},
  }

  const itemVariants: Variants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {duration: 0.6, ease: 'easeOut'}},
  }

  useEffect(() => {
    if (isInView) controls.start('visible')
    else controls.start('hidden')
  }, [isInView, controls])

  return (
    <section
      ref={ref}
      className="relative bg-[#000c49] py-24 sm:py-32 text-white overflow-hidden"
    >
      {data?.backgroundImage?.asset && (
        <>
          <Image
            src={urlFor(data.backgroundImage).url()}
            alt={data.backgroundImage.alt || 'More services background'}
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-50" />
        </>
      )}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={itemVariants} className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data?.title || 'Explore More Services'}
          </h2>
        </motion.div>

        {data?.services && data.services.length > 0 ? (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-8">
            {data.services.map((service: Service) => (
              <motion.div
                key={service.title} // Assuming service titles are unique
                variants={itemVariants}
                whileHover={{scale: 1.03, transition: {type: 'spring', stiffness: 300}}}
                className="flex flex-col rounded-2xl bg-white/5 p-8 ring-1 ring-inset ring-white/10"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-x-4">
                    {service.serviceIcon && iconMap[service.serviceIcon] && (
                      <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-indigo-500">
                        {React.createElement(iconMap[service.serviceIcon], {
                          className: 'h-6 w-6 text-white',
                          'aria-hidden': 'true',
                        })}
                      </div>
                    )}
                    <h3 className="text-2xl font-semibold leading-8 text-white">{service.title}</h3>
                  </div>
                  <div className="mt-6 flex flex-col gap-y-8">
                    {/* Left Column */}
                    <div className="flex flex-1 flex-col">
                      <p className="flex-grow text-base leading-7 text-gray-300">{service.description}</p>
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
                        className="group flex flex-col rounded-2xl bg-gray-900/50 p-6 ring-1 ring-indigo-500/20"
                        whileHover={{
                          backgroundColor: 'hsla(220, 13%, 28%, 0.5)', // A slightly brighter gray with 50% opacity
                        }}
                        transition={{type: 'spring', stiffness: 400, damping: 20}}
                      >
                        <p className="text-sm leading-7 text-gray-300 transition-all">{service.shortDescription}</p>
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
          </div>
        ) : (
          <motion.div variants={itemVariants} className="mt-16 text-center text-gray-400">
            <p>No services have been added to this section yet. Please add and publish services in the CMS.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}