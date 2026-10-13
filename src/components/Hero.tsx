import React from 'react'
import { motion } from 'motion/react'

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#ffffff]">
      {/* Full-width Hero Container matching Webflow .hero-images-wrapper */}
      <div className="relative w-full h-[52vh] sm:h-[65vh] md:h-[85vh] md:min-h-[85vh] md:max-h-[85vh] overflow-hidden select-none mb-0">
        {/* Layer 1: Sky Background with fixed parallax window on desktop */}
        <div
          className="absolute inset-0 w-full h-full bg-center bg-no-repeat bg-cover md:bg-fixed pointer-events-none"
          style={{
            backgroundImage: "url('/hero-bg-sky.webp')",
            backgroundPosition: '50% 50%',
          }}
        />

        {/* Layer 2: Typographic Depth Title (WONDERGLASS) */}
        <div className="absolute top-[8vw] sm:top-[7vw] md:top-[5.5vw] inset-x-0 flex justify-center text-center select-none pointer-events-none z-[2] px-4 mix-blend-overlay">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[10.8vw] font-black uppercase text-[#111111] tracking-[0.01em] leading-none whitespace-nowrap"
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
      </div>
    </section>
  )
}

