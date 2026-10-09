import React from 'react'
import { SectionTitle } from './ui/SectionTitle'
import { Reveal } from './ui/Reveal'

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left: Heading */}
          <div className="lg:col-span-4">
            <SectionTitle title="ABOUT" />
          </div>

          {/* Right: Two columns with staggered reveal */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pt-2">
            <Reveal delay={0.15} direction="up">
              <p className="text-[13.5px] md:text-[14.5px] leading-[1.8] text-[#444444] font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis cursus,
                mi quis viverra ornare, eros dolor interdum nulla.
              </p>
            </Reveal>

            <Reveal delay={0.25} direction="up">
              <p className="text-[13.5px] md:text-[14.5px] leading-[1.8] text-[#444444] font-normal">
                Ut commodo diam libero vitae erat. Aenean faucibus nibh et justo
                cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                tristique posuere.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
