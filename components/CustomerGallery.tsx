'use client'

import {CustomerGalleryItem, SanityImage} from '@/lib/types'
import {urlFor} from '@/lib/client'
import Image from 'next/image'
import {motion, useInView} from 'framer-motion'
import {useRef, useState} from 'react'

interface CustomerGalleryData {
  _id: string
  customerName: string
  mediaItems: CustomerGalleryItem[]
}

interface CustomerGalleryProps {
  galleries: CustomerGalleryData[]
}

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.3},
  },
}

const groupVariants = {
  hidden: {opacity: 0, y: 50},
  visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}},
}

const itemVariants = {
  hidden: {opacity: 0, scale: 0.8},
  visible: {opacity: 1, scale: 1},
}

export default function CustomerGallery({galleries}: CustomerGalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.1})
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  if (!galleries || galleries.length === 0) {
    return null
  }

  return (
    <div ref={ref} className="bg-[#000729] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {galleries.map(gallery => (
            <motion.div key={gallery._id} variants={groupVariants}>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-8">
                {gallery.customerName}
              </h2>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {gallery.mediaItems?.map((item, index) => (
                  <motion.div
                    key={item.asset._ref + index}
                    variants={itemVariants}
                    layoutId={item._key}
                    onClick={() => {
                      const url = item._type === 'videoItem' ? item.videoUrl : urlFor(item).url()
                      if (url) setSelectedImg(url)
                    }}
                    className="aspect-square cursor-pointer overflow-hidden rounded-lg"
                    whileHover={{scale: 1.05, zIndex: 10}}
                    transition={{type: 'spring', stiffness: 300}}
                  >
                    {item._type === 'videoItem' ? (
                      <video
                        src={item.videoUrl}
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <Image
                        src={urlFor(item).width(400).height(400).url()}
                        alt={item.alt || `Gallery image for ${gallery.customerName}`}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImg && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImg(null)}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          {selectedImg.endsWith('.mp4') || selectedImg.endsWith('.mov') ? (
            <motion.video
              layoutId={selectedImg}
              src={selectedImg}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              autoPlay
              controls
              loop
            />
          ) : (
            <motion.img
              layoutId={selectedImg}
              src={selectedImg}
              alt="Enlarged view"
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
          )}
        </motion.div>
      )}
    </div>
  )
}