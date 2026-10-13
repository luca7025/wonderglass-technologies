import React from 'react'
import { motion } from 'motion/react'
import { Reveal } from './ui/Reveal'
import { ShieldCheck, Sparkles } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-20 pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-28 bg-[#ffffff]"
    >
      <div className="w-full px-5 sm:px-10 md:px-14 lg:px-16">
        {/* Subtle decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-full bg-[#f0f0f0] origin-left mb-8 md:mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left: Heading & Mobile Badge */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#f4f5f7] text-[#555555] text-[11px] font-bold uppercase tracking-widest mb-3">
                <Sparkles size={12} className="text-[#111111]" />
                UAE Engineering Excellence
              </span>
            </Reveal>

            <Reveal delay={0.1} direction="up">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111111]">
                About
              </h2>
            </Reveal>
          </div>

          {/* Right: Two columns detailing WonderGlass craft */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 pt-1 md:pt-2">
            <Reveal delay={0.15} direction="up">
              <p className="text-[14px] sm:text-[14.5px] md:text-[15px] leading-[1.8] text-[#555555] font-normal">
                WonderGlass Technologies designs and engineers high-performance architectural glass systems, motorized vertical sliding façades, and switchable smart glass across the United Arab Emirates. We bridge architectural vision and engineering precision.
              </p>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <p className="text-[14px] sm:text-[14.5px] md:text-[15px] leading-[1.8] text-[#555555] font-normal">
                From luxury private residences in Emirates Hills to commercial landmarks on Abu Dhabi Corniche, our turnkey solutions integrate thermal performance, whisper-quiet motorization, and minimalist European profiles crafted for the regional climate.
              </p>
            </Reveal>
          </div>
        </div>

        {/* 3 Quick Mobile-Friendly Trust Badges */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 pt-8 border-t border-[#f2f2f2]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3">
            <ShieldCheck size={20} className="text-[#111111] shrink-0" />
            <div>
              <h4 className="text-[12px] sm:text-[13px] font-bold text-[#111111] uppercase tracking-wide">
                10-Year Warranty
              </h4>
              <p className="hidden sm:block text-[11.5px] text-[#666666] mt-0.5">
                European certified glass & motorization
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3">
            <span className="w-5 h-5 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              UAE
            </span>
            <div>
              <h4 className="text-[12px] sm:text-[13px] font-bold text-[#111111] uppercase tracking-wide">
                Direct Fabrication
              </h4>
              <p className="hidden sm:block text-[11.5px] text-[#666666] mt-0.5">
                Regional hubs in Abu Dhabi & Dubai
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3">
            <span className="text-[16px] leading-none shrink-0">⚡</span>
            <div>
              <h4 className="text-[12px] sm:text-[13px] font-bold text-[#111111] uppercase tracking-wide">
                Smart Integration
              </h4>
              <p className="hidden sm:block text-[11.5px] text-[#666666] mt-0.5">
                Home automation & app controls
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
