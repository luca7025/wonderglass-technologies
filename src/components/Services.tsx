import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, ArrowUpRight } from 'lucide-react'
import { SectionTitle } from './ui/SectionTitle'
import { servicesData } from '../data/services'

export const Services: React.FC = () => {
  const [activeNumber, setActiveNumber] = useState<string | null>('01')

  const toggleAccordion = (number: string) => {
    setActiveNumber((prev) => (prev === number ? null : number))
  }

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
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
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.85,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="origin-left h-[1px] w-full bg-[#e6e7ea]"
                  />

                  {/* Header Row */}
                  <motion.button
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleAccordion(service.number)}
                    className="w-full py-5 sm:py-7 md:py-9 flex items-center justify-between text-left group transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center sm:items-baseline gap-4 sm:gap-8 md:gap-10">
                      <span className="text-[12px] sm:text-[13px] font-mono font-medium text-[#777777] tracking-wider shrink-0">
                        {service.number}
                      </span>
                      <h3 className="text-lg sm:text-2xl md:text-[26px] font-bold tracking-tight text-[#111111] transition-colors group-hover:text-black">
                        {service.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        backgroundColor: isOpen ? '#111111' : '#f4f5f7',
                        color: isOpen ? '#ffffff' : '#111111',
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ml-2"
                    >
                      <Plus size={18} strokeWidth={2.2} />
                    </motion.div>
                  </motion.button>

                  {/* Accordion Content Container */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.3, delay: 0.1 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 sm:pb-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
                          {/* Copy & Bullets */}
                          <div className="flex flex-col justify-between h-full space-y-5">
                            <p className="text-[13.5px] sm:text-[14px] leading-[1.75] text-[#555555]">
                              {service.description}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2 pt-1">
                              {service.bullets.map((bullet, bIdx) => (
                                <motion.li
                                  key={bIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.25, delay: bIdx * 0.05 }}
                                  className="text-[12.5px] text-[#333333] flex items-center gap-2 bg-[#f8f9fa] sm:bg-transparent px-3 sm:px-0 py-2 sm:py-0.5 rounded-[2px]"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                                  <span className="font-medium">{bullet}</span>
                                </motion.li>
                              ))}
                            </ul>

                            <div className="pt-2">
                              <a
                                href="#contact"
                                className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#111111] hover:underline underline-offset-4"
                              >
                                <span>Inquire for Specs</span>
                                <ArrowUpRight size={14} />
                              </a>
                            </div>
                          </div>

                          {/* Portrait Image with reveal */}
                          <div className="w-full h-[240px] sm:h-[300px] md:h-[340px] overflow-hidden rounded-[2px] bg-[#f0f0f0] shadow-sm">
                            <motion.img
                              initial={{ scale: 1.08, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              decoding="async"
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
