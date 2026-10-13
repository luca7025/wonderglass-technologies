import React from 'react'
import { Reveal } from './ui/Reveal'

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-20 pt-4 md:pt-6 pb-20 md:pb-28 bg-[#ffffff]"
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#111111]">
              About
            </h2>
          </div>

          {/* Right: Two columns detailing WonderGlass craft */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-1 md:pt-2">
            <Reveal delay={0.15} direction="up">
              <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#555555] font-normal">
                WonderGlass Technologies designs and engineers high-performance architectural glass systems, motorized vertical sliding façades, and switchable smart glass across the United Arab Emirates. We bridge architectural vision and engineering precision.
              </p>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <p className="text-[14px] md:text-[15px] leading-[1.75] text-[#555555] font-normal">
                From luxury private residences in Emirates Hills to commercial landmarks on Abu Dhabi Corniche, our turnkey solutions integrate thermal performance, whisper-quiet motorization, and minimalist European profiles crafted for the regional climate.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
