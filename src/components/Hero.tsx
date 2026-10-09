import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Spring smoothed scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 35,
  })

  // Title transformations: scales up and spreads wider on scroll
  const titleScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.28]
  )
  const titleLetterSpacing = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ['0.02em', '0.02em'] : ['0.02em', '0.12em']
  )
  const titleY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -60]
  )

  // Inset image expansions: expands from inset rounded rectangle to full-bleed width
  const imageScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.94, 1.05]
  )
  const imageRadius = useTransform(
    smoothProgress,
    [0, 0.7],
    shouldReduceMotion ? ['0px', '0px'] : ['20px', '0px']
  )
  const imageParallaxY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 90]
  )

  return (
    <section
      ref={containerRef}
      className="relative pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden bg-[#ffffff]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-14">
        {/* Giant WOODLAND Backdrop Title */}
        <motion.div
          style={{
            scale: titleScale,
            letterSpacing: titleLetterSpacing,
            y: titleY,
          }}
          className="w-full text-center select-none pointer-events-none -mb-[9vw] sm:-mb-[8vw] z-10 relative"
        >
          <h1 className="text-[17vw] font-black uppercase text-[#a9bcc9]/50 tracking-tight leading-[0.8] transition-colors">
            WOODLAND
          </h1>
        </motion.div>

        {/* Expanding Hero Villa Image with Inset Parallax */}
        <motion.div
          style={{
            borderRadius: imageRadius,
            scale: imageScale,
          }}
          className="relative w-full h-[54vw] min-h-[380px] max-h-[740px] overflow-hidden shadow-2xl z-20 origin-top"
        >
          <motion.img
            src="/hero-villa.jpg"
            alt="Woodland Architecture Luxury Modern Villa with Infinity Pool"
            style={{ y: imageParallaxY }}
            className="w-full h-[120%] -top-[10%] relative object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  )
}
