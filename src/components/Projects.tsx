import React from 'react'
import { motion } from 'motion/react'
import { SectionTitle } from './ui/SectionTitle'
import { ParallaxImage } from './ui/ParallaxImage'
import { Reveal } from './ui/Reveal'
import { projectsData } from '../data/projects'
import { cn } from '../lib/utils'
import { ArrowUpRight } from 'lucide-react'

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left: Sticky Section Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <SectionTitle title="PROJECTS" />
          </div>

          {/* Right: Stacked Projects */}
          <div className="lg:col-span-8 flex flex-col gap-14 sm:gap-20 md:gap-32">
            {projectsData.map((project, idx) => (
              <div key={project.id} className="relative group">
                {/* Large Parallax Project Image */}
                <motion.div
                  whileTap={{ scale: 0.99 }}
                  className="w-full h-[280px] sm:h-[420px] md:h-[620px] rounded-[2px] overflow-hidden relative shadow-sm"
                >
                  <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    offset={40}
                    className="w-full h-full"
                  />

                  {/* Mobile-friendly category badge */}
                  <div className="absolute top-4 left-4 z-10 md:hidden bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider">
                    {project.meta.split('•')[0] || 'UAE Project'}
                  </div>
                </motion.div>

                {/* Overlapping Frosted Glass Info Card */}
                <Reveal
                  delay={0.15}
                  direction={project.align === 'left' ? 'left' : 'right'}
                  className={cn(
                    'mt-4 md:mt-0 md:absolute md:bottom-8 z-20 w-full md:w-[350px] lg:w-[380px]',
                    'bg-[#ffffff]/95 md:bg-[#ffffff]/90 backdrop-blur-md p-5 sm:p-7 md:p-8 border border-[#e5e7eb] md:border-[#ffffff]/60 shadow-lg md:shadow-xl rounded-[2px]',
                    project.align === 'left' ? 'md:left-8' : 'md:right-8'
                  )}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-semibold text-[#888888] tracking-widest">
                      0{idx + 1}
                    </span>
                    <a
                      href="#contact"
                      className="text-[11px] font-bold text-[#111111] hover:underline flex items-center gap-1 uppercase tracking-wider"
                    >
                      <span>Consult</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[12px] font-medium text-[#777777] mb-3">
                    {project.meta}
                  </p>
                  <p className="text-[13px] leading-[1.7] text-[#444444]">
                    {project.description}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
