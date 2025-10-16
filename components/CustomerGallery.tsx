'use client'

import {CustomerGalleryItem, SanityImage, CustomerGallerySectionData} from '@/lib/types'
import {urlFor} from '@/lib/client'
import NextImage from 'next/image'
import {motion, useInView} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

interface CustomerGalleryData {
  _id: string
  customerName: string
  mediaItems: CustomerGalleryItem[]
}

interface CustomerGalleryProps {
  galleries: CustomerGalleryData[]
  sectionData: CustomerGallerySectionData | null
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

const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

function GalleryVideo({src, onClick}: {src?: string; onClick: () => void}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(videoRef, {margin: '0px 0px -50px 0px'})

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        // The play() method returns a promise. It's a good practice to handle it.
        videoRef.current.play().catch(error => {
          console.error('Video autoplay was prevented:', error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return !src ? null : (
    <div onClick={onClick} className="h-full w-full">
      <video ref={videoRef} src={src} className="h-full w-full object-cover" loop muted playsInline />
    </div>
  )
}

export default function CustomerGallery({galleries, sectionData}: CustomerGalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: false, amount: 0.1})
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  if (!galleries || galleries.length === 0) {
    return null
  }

  return (
    <div ref={ref} className="relative bg-[#000c49]">
      {sectionData?.backgroundImage && (
        <NextImage
          src={urlFor(sectionData.backgroundImage).url()}
          alt={sectionData.backgroundImage.alt || 'Gallery background'}
          layout="fill"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {sectionData?.backgroundImage && <div className="absolute inset-0 bg-black opacity-50" />}
      {/* Client Navigation */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-16 sm:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {sectionData?.title || 'Client Work'}
          </h2>
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#000c49] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#000c49] to-transparent" />
            <div className="flex items-center gap-x-4 overflow-x-auto whitespace-nowrap px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {galleries.map(gallery => (
                <a
                  key={gallery._id}
                  href={`#${slugify(gallery.customerName)}`}
                  className="flex-shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:scale-105"
                >
                  {gallery.customerName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="space-y-16"
      >
        {galleries.map(gallery => (
          <motion.div
            key={gallery._id}
            id={slugify(gallery.customerName)}
            variants={groupVariants}
            className="flex min-h-screen flex-col justify-center scroll-mt-24 py-16 sm:py-24 px-6 lg:px-8"
          >
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-8">
              {gallery.customerName}
            </h2>
            <div className="columns-2 gap-2 sm:columns-3 md:columns-4 lg:columns-5">
              {gallery.mediaItems?.map((item, index) => (
                <motion.div
                  key={item.asset._ref + index}
                  variants={itemVariants}
                  layoutId={item._key}
                  className="mb-2 break-inside-avoid cursor-pointer overflow-hidden"
                  whileHover={{scale: 1.05, zIndex: 10}}
                  transition={{type: 'spring', stiffness: 300}}
                >
                  {item._type === 'videoItem' ? (
                    <GalleryVideo
                      src={item.videoUrl}
                      onClick={() => {
                        if (item.videoUrl) setSelectedImg(item.videoUrl)
                      }}
                    />
                  ) : (
                    <NextImage
                      src={urlFor(item as unknown as SanityImage).width(500).url()}
                      alt={item.alt || `Gallery image for ${gallery.customerName}`}
                      width={500}
                      height={0} // Set to 0 to allow auto-height based on aspect ratio
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{height: 'auto'}}
                      onClick={() => {
                        const url = urlFor(item as unknown as SanityImage).url()
                        if (url) setSelectedImg(url)
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

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