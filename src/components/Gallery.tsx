import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { galleryData } from '../data/gallery'
import { cn } from '../lib/utils'

interface FloatingImageProps {
  image: string
  title: string
  className: string
  speed: number
  scrollYProgress: import('motion/react').MotionValue<number>
  shouldReduceMotion: boolean | null
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  image,
  title,
  className,
  speed,
  scrollYProgress,
  shouldReduceMotion,
}) => {
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed, speed]
  )
  const y = useSpring(rawY, { stiffness: 220, damping: 35 })

  return (
    <motion.div
      style={{ y }}
      className={cn(
        'relative overflow-hidden rounded-[2px] shadow-lg z-20 transition-shadow hover:shadow-2xl',
        className
      )}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </motion.div>
  )
}

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-28 md:py-40 overflow-hidden bg-[#ffffff]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 relative min-h-[900px] md:min-h-[1100px] flex items-center justify-center">
        {/* Sticky Centered GALLERY Title */}
        <div className="sticky top-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-10">
          <h2 className="text-[17vw] font-black uppercase tracking-tight text-[#111111] leading-none opacity-95">
            GALLERY
          </h2>
        </div>

        {/* Scattered Collage of Drifting Images */}
        <div className="absolute inset-0 w-full h-full grid grid-cols-12 gap-4 md:gap-6 items-center pointer-events-auto">
          {galleryData.map((item) => (
            <FloatingImage
              key={item.id}
              image={item.image}
              title={item.title}
              className={item.className}
              speed={item.speed}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
