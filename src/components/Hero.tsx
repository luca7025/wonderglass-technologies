import React from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#ffffff]">
      {/* Full-width Hero Container */}
      <div className="relative w-full h-[56vh] sm:h-[65vh] md:h-[85vh] md:min-h-[85vh] md:max-h-[85vh] overflow-hidden select-none mb-0">
        {/* Layer 1: Sky Background with fixed parallax window on desktop */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover md:bg-fixed pointer-events-none"
          style={{
            backgroundImage: "url('/hero-bg-sky.webp')",
            backgroundPosition: '50% 50%',
          }}
        />

        {/* Layer 2: Typographic Depth Title (WONDERGLASS) */}
        <div className="absolute top-[9vw] sm:top-[7vw] md:top-[5.5vw] inset-x-0 flex flex-col items-center justify-center text-center select-none pointer-events-none z-[2] px-3 mix-blend-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[11.2vw] sm:text-[10.8vw] font-black uppercase text-[#111111] tracking-[0.01em] leading-none whitespace-nowrap"
          >
            WONDERGLASS
          </motion.h1>
        </div>

        {/* Layer 3: Foreground Villa Cutout (sits in front of the text) */}
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-cover md:bg-fixed pointer-events-none z-[3]"
          style={{
            backgroundImage: "url('/hero-fg-villa.webp')",
            backgroundPosition: '50% 0%',
          }}
        />

        {/* Layer 4: Cinematic Curtain Opening Animation */}
        <div className="absolute inset-0 z-[4] flex pointer-events-none overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-1/2 h-full bg-[#ffffff]"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-1/2 h-full bg-[#ffffff]"
          />
        </div>

        {/* Layer 5: Mobile & Desktop Floating Architectural Badges */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-[5] flex items-center justify-between px-5 sm:px-10 md:px-14 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-[#ffffff]/85 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-black/10 shadow-sm pointer-events-auto"
          >
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#111111]">
              ✦ Architectural Systems • UAE
            </span>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="hidden sm:flex items-center gap-1.5 bg-[#ffffff]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/10 text-[11px] font-semibold text-[#333333] hover:text-[#000000] pointer-events-auto transition-colors"
          >
            <span className="tracking-wider uppercase text-[10px]">Scroll</span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={13} />
            </motion.div>
          </motion.a>
        </div>
      </div>
    </section>
  )
}
