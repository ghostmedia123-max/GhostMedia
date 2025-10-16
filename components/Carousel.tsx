'use client';

import { motion, useAnimationControls, Variants, useMotionValue, useInView } from 'framer-motion';
import { CarouselData } from '@/lib/types';
import { urlFor } from '@/lib/client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  data: CarouselData;
  duration?: number; // Speed factor: lower is faster
}

export default function Carousel({ data, duration = 60 }: CarouselProps) {
  console.log('Carousel component received data:', data);

  if (!data) {
    return null; // Don't render anything if there's no data at all
  }

  // --- Entrance Animation Hooks ---
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.2 });
  const entranceControls = useAnimationControls();

  useEffect(() => {
    if (isSectionInView) {
      entranceControls.start('visible');
    } else {
      entranceControls.start('hidden');
    }
  }, [isSectionInView, entranceControls]);

  const entranceContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
  };

  const entranceItemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const carouselBoxVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  // --- End Entrance Animation Hooks ---

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const slides = data.featureFirstSlide ? [data.slides[0], ...data.slides] : data.slides;
  const extendedSlides = [...slides, ...slides];
  
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    // Only start the animation if not hovered, not dragging, and the page is visible
    if (!isHovered && !isDragging && isPageVisible) {
      const currentX = x.get();
      const totalWidth = slides.length * (400 + 2);
      const remainingDistance = totalWidth + currentX;
      const totalDuration = slides.length * (duration / 10);
      const remainingDuration = (remainingDistance / totalWidth) * totalDuration;

      controls.start({
        x: -totalWidth,
        transition: {
          ease: 'linear',
          duration: remainingDuration,
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, isDragging, isPageVisible, controls, data, duration, slides.length, x]);

  return (
    <motion.div
      ref={sectionRef}
      className="w-full overflow-hidden py-24 sm:py-32 bg-black"
      variants={entranceContainerVariants}
      initial="hidden"
      animate={entranceControls}
    >
      {data.title && (
        <motion.div variants={entranceItemVariants} className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-12 mx-auto">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{data.title}</h2>
              {data.description && <p className="mt-6 text-lg leading-8 text-gray-400">{data.description}</p>}
            </div>
          </div>
        </motion.div>
      )}
      {/* Only render the carousel itself if there are slides */}
      {data.slides && data.slides.length > 0 && (
        <motion.div
          variants={carouselBoxVariants}
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative m-auto w-full cursor-grab before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-gradient-to-r before:from-black before:to-transparent after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:bg-gradient-to-l after:from-black after:to-transparent active:cursor-grabbing"
        >
          <motion.div
            className="flex space-x-0.5"
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ x }}
            animate={controls}
          >
            {extendedSlides.map((slide, index) => (
              <div key={index} className="group w-[400px] flex-shrink-0">
                <div className="overflow-hidden">
                  <Image
                    src={urlFor(slide.image).width(400).height(400).fit('crop').url()}
                    alt={slide.headline || `Carousel image ${index + 1}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 pointer-events-none"
                  />
                </div>
                {slide.headline && <p className="mt-4 text-center text-sm text-gray-400">{slide.headline}</p>}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}