'use client'

import {GalleryItem, GallerySectionData} from '@/lib/types'
import {motion, useInView, Variants, AnimatePresence} from 'framer-motion'
import Masonry from 'react-masonry-css'
import {useRef, useState} from 'react'

interface PortfolioGalleryProps {
  items: GalleryItem[]
  sectionData: GallerySectionData | null
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 20, scale: 0.95},
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export default function PortfolioGallery({items, sectionData}: PortfolioGalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: false, amount: 0.1})
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)


  // Define breakpoints for the masonry grid
  const breakpointColumnsObj = {
    default: 4,
    1024: 3, // lg
    768: 2,  // md
  };

  return (
    <motion.div
      ref={ref}
      className="bg-[#001484] py-24 sm:py-32"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={itemVariants} className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {sectionData?.title || 'Our Work in Motion'}
          </h2>
          {sectionData?.description && (
            <p className="mt-6 text-lg leading-8 text-gray-300">{sectionData.description}</p>
          )}
        </motion.div>

        {items && items.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-0.5 mt-16 sm:mt-20" // Negative margin to offset item padding
            columnClassName="pl-0.5 bg-clip-padding" // Padding on columns to create the gap
          >
            {items.map(item => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                layout
                className="relative overflow-hidden shadow-lg mb-0.5 cursor-pointer"
                onHoverStart={() => setHoveredId(item._id)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  scale: hoveredId === item._id ? 1.1 : 1,
                  opacity: hoveredId && hoveredId !== item._id ? 0.7 : 1,
                  zIndex: hoveredId === item._id ? 10 : 1,
                }}
                transition={{type: 'spring', stiffness: 300, damping: 20}}
              >
                <motion.div variants={itemVariants} layoutId={item._id} onClick={() => setSelectedId(item._id)} className="relative overflow-hidden shadow-lg cursor-pointer">
                  {item.mediaType.startsWith('video') ? (
                    <video src={item.mediaUrl} className="w-full h-auto object-cover" autoPlay loop muted playsInline />
                  ) : (
                    <img src={item.mediaUrl} alt={item.title || 'Gallery image'} className="w-full h-auto object-cover" />
                  )}
                  
                </motion.div>
              </motion.div>
            ))}
          </Masonry>
        )}
      </div>
      <AnimatePresence>
        {selectedId && items.find(item => item._id === selectedId) && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div layoutId={selectedId} className="max-w-3xl max-h-[80vh]">
              {items.find(item => item._id === selectedId)?.mediaType.startsWith('video') ? (
                <video src={items.find(item => item._id === selectedId)?.mediaUrl} className="w-full h-auto object-contain max-h-[80vh]" autoPlay loop muted controls />
              ) : (
                <img src={items.find(item => item._id === selectedId)?.mediaUrl} alt={items.find(item => item._id === selectedId)?.title || 'Gallery image'} className="w-full h-auto object-contain max-h-[80vh]" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}