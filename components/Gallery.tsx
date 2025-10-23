'use client'

import {GalleryPageData, GalleryCustomerData, GalleryMediaItem, SanityImage} from '@/lib/types'
import {motion, useInView, AnimatePresence} from 'framer-motion'
import Image from 'next/image'
import {urlFor} from '@/lib/client'
import {useRef, useState, useEffect} from 'react'
import Masonry from 'react-masonry-css'

interface GalleryProps {
  pageData: GalleryPageData | null
  customers: GalleryCustomerData[]
}

function GalleryVideo({src, onClick}: {src?: string; onClick: () => void}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(videoRef, {margin: '0px 0px -50px 0px'})

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
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

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.3},
  },
}

const itemVariants = {
  hidden: {opacity: 0, y: 50},
  visible: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}},
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
export default function Gallery({pageData, customers}: GalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.1})
  const [selectedMedia, setSelectedMedia] = useState<GalleryMediaItem | null>(null)

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  return (
    <div ref={ref} className="bg-[#000417] text-white min-h-screen">
      {/* Always render the header section */}
      <div className="relative isolate overflow-hidden bg-[#000417] pt-24 sm:pt-32 pb-12">
        {pageData?.backgroundImage?.asset && (
          <>
            <Image
              src={urlFor(pageData.backgroundImage).url()}
              alt={pageData.backgroundImage.alt || 'Gallery background'}
              fill
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 -z-10" />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{pageData?.title || 'Our Work'}</h1>
            {pageData?.description && <p className="mt-6 text-lg leading-8 text-gray-300">{pageData.description}</p>}
          </div>
          {/* Customer Navigation */}
          {customers && customers.length > 0 && (
            <div className="relative mx-auto max-w-7xl mt-16">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#000417] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#000417] to-transparent" />
              <div className="flex items-center gap-x-4 overflow-x-auto whitespace-nowrap px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {customers.map(customer => (
                  <a
                    key={customer._id}
                    href={`#${slugify(customer.name)}`}
                    className="flex-shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:scale-105"
                  >
                    {customer.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
        {customers && customers.length > 0 ? (
          customers.map(customer => (
            <motion.section
              key={customer._id}
              id={slugify(customer.name)}
              variants={itemVariants}
              className="relative scroll-mt-24"
            >
              {customer.backgroundImage && (
                <>
                  <Image
                    src={urlFor(customer.backgroundImage).url()}
                    alt={customer.backgroundImage.alt || `Background for ${customer.name}`}
                    fill
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 z-0 bg-black/50" />
                </>
              )}
              <div className="relative z-10 mx-auto max-w-7xl space-y-12 px-6 pt-16 pb-16 sm:pt-24 sm:pb-24 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{customer.name}</h2>
                {customer.mediaItems && customer.mediaItems.length > 0 && (
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-px"
                    columnClassName="pl-px bg-clip-padding"
                  >
                    {customer.mediaItems.map((item, index) => (
                      <motion.div
                        key={item._key || index}
                        variants={itemVariants}
                        layoutId={item._key}
                        className="mb-px break-inside-avoid cursor-pointer overflow-hidden"
                        whileHover={{scale: 1.05, zIndex: 10}}
                        transition={{type: 'spring', stiffness: 300}}
                        onClick={() => setSelectedMedia(item)}
                      >
                        {item._type === 'videoItem' ? (
                          <GalleryVideo src={item.videoUrl} onClick={() => setSelectedMedia(item)} />
                        ) : (
                          <Image
                            src={urlFor(item as SanityImage).width(500).url()}
                            alt={(item as SanityImage).alt || `Gallery image for ${customer.name}`}
                            width={500}
                            height={300}
                            className="h-auto w-full object-cover"
                          />
                        )}
                      </motion.div>
                    ))}
                  </Masonry>
                )}
              </div>
            </motion.section>
          ))
        ) : (
          <motion.div variants={itemVariants} className="py-24 text-center text-gray-400">
            <p>More client work coming soon.</p>
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setSelectedMedia(null)}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            {selectedMedia._type === 'videoItem' ? (
              <motion.video layoutId={selectedMedia._key} src={selectedMedia.videoUrl} className="max-h-[90vh] max-w-[90vw] object-contain" autoPlay controls loop />
            ) : (
              <motion.img layoutId={selectedMedia._key} src={urlFor(selectedMedia as SanityImage).url()} alt={(selectedMedia as SanityImage).alt || 'Enlarged view'} className="max-h-[90vh] max-w-[90vw] object-contain" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}