import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { servicesData } from '../data/services'

export const Services: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string | null>('01')

  const toggleAccordion = (number: string) => {
    setActiveNumber((prev) => (prev === number ? null : number))
  }

  return (
    <section id="services" className="py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left: Sticky Section Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <SectionTitle title="SERVICES" />
          </div>

          {/* Right: Accordion rows */}
          <div className="lg:col-span-8 flex flex-col">
            {servicesData.map((service, index) => {
              const isOpen = activeNumber === service.number

              return (
                <div key={service.number} className="relative">
                  {/* Animated Divider line drawing in from left to right */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.85,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="origin-left h-[1px] w-full bg-[#e6e7ea]"
                  />

                  {/* Header Row */}
                  <button
                    onClick={() => toggleAccordion(service.number)}
                    className="w-full py-7 md:py-9 flex items-center justify-between text-left group transition-colors"
                  >
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="text-[13px] font-mono font-medium text-[#777777] tracking-wider">
                        {service.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-[#111111] transition-colors group-hover:text-black">
                        {service.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="p-1 rounded-full text-[#111111] flex-shrink-0"
                    >
                      <Plus size={22} strokeWidth={1.75} />
                    </motion.div>
                  </button>

                  {/* Expanded Content with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden pb-10"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start pt-2">
                          {/* Text description and bullets */}
                          <div className="flex flex-col">
                            <p className="text-[13.5px] md:text-[14px] leading-[1.75] text-[#444444] mb-6">
                              {service.description}
                            </p>
                            <ul className="space-y-2.5">
                              {service.bullets.map((bullet) => (
                                <li
                                  key={bullet}
                                  className="text-[13px] text-[#555555] flex items-center gap-2.5"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/60" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Portrait Image with reveal */}
                          <div className="w-full h-[280px] sm:h-[320px] md:h-[340px] overflow-hidden rounded-[2px] bg-[#f0f0f0]">
                            <motion.img
                              initial={{ scale: 1.1, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Bottom terminating line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-[1px] w-full bg-[#e6e7ea]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
