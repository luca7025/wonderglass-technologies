import React, { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
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
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </motion.div>
  )
}

export const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Mobile carousel state
  const [mobileIdx, setMobileIdx] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const nextMobileSlide = () => {
    setMobileIdx((prev) => (prev + 1) % galleryData.length)
  }

  const prevMobileSlide = () => {
    setMobileIdx((prev) => (prev - 1 + galleryData.length) % galleryData.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (diff > 45) {
      nextMobileSlide()
    } else if (diff < -45) {
      prevMobileSlide()
    }
    setTouchStartX(null)
  }

  const currentMobileItem = galleryData[mobileIdx]

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-20 md:py-40 overflow-hidden bg-[#ffffff]"
    >
      {/* ================= MOBILE VIEW (< md) ================= */}
      <div className="block md:hidden px-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#777777] flex items-center gap-1.5">
            <Sparkles size={12} className="text-[#111111]" />
            CURATED GALLERY
          </span>
          <span className="text-[11px] font-mono font-semibold text-[#888888] px-2 py-0.5 bg-[#f4f5f7] rounded-[2px]">
            {String(mobileIdx + 1).padStart(2, '0')} / {String(galleryData.length).padStart(2, '0')}
          </span>
        </div>

        <h2 className="text-3xl font-black uppercase tracking-tight text-[#111111] mb-6">
          FABRICATION SHOWCASE
        </h2>

        {/* Mobile Interactive Touch Card */}
        <div
          className="relative overflow-hidden rounded-[4px] border border-[#e5e7eb] bg-[#111111] shadow-lg touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMobileItem.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative w-full h-[360px]"
            >
              <img
                src={currentMobileItem.image}
                alt={currentMobileItem.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />

              {/* Gradient Scrim & Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#cccccc] mb-1">
                  PROJECT REF 0{mobileIdx + 1}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-white leading-snug">
                  {currentMobileItem.title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Touch Swipe Overlay Hint */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-[2px] text-[10px] text-white/90 font-mono tracking-wider">
            SWIPE ↔
          </div>
        </div>

        {/* Mobile Navigation Controls & Dots */}
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-1.5">
            {galleryData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === mobileIdx ? 'w-6 bg-[#111111]' : 'w-1.5 bg-[#d1d5db]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={prevMobileSlide}
              aria-label="Previous image"
              className="w-10 h-10 rounded-full border border-[#d1d5db] bg-white flex items-center justify-center text-[#111111] shadow-xs active:bg-[#f3f4f6]"
            >
              <ArrowLeft size={16} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={nextMobileSlide}
              aria-label="Next image"
              className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white shadow-xs active:bg-[#333333]"
            >
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP VIEW (>= md) ================= */}
      <div className="hidden md:flex max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 relative min-h-[900px] md:min-h-[1100px] items-center justify-center">
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

