import React, { useRef } from 'react'
import CountUp from 'react-countup'
import { useInView } from 'motion/react'
import { Reveal } from './ui/Reveal'

const STATS_DATA = [
  { end: 316, suffix: '+', label: 'projects completed' },
  { end: 740, suffix: '+', label: 'satisfied customers' },
  { end: 215, suffix: '+', label: 'YTD transactions' },
]

export const Stats: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(statsRef, { once: true, margin: '-50px' })

  return (
    <section className="py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Top Kicker Label */}
        <Reveal direction="up">
          <span className="block text-[11px] md:text-xs font-bold tracking-[0.14em] uppercase text-[#111111] mb-10 md:mb-14">
            BY THE NUMBERS
          </span>
        </Reveal>

        {/* 3 CountUp Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16 pb-20 md:pb-28"
        >
          {STATS_DATA.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 0.15} direction="up">
              <div className="flex flex-col">
                <span className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] leading-none mb-3">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={item.end}
                      duration={2.5}
                      suffix={item.suffix}
                      useEasing={true}
                    />
                  ) : (
                    `0${item.suffix}`
                  )}
                </span>
                <span className="text-[13px] md:text-[14px] text-[#666666]">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* As Featured In */}
        <div className="text-center pt-8 border-t border-[#f0f0f0]">
          <Reveal direction="up">
            <span className="block text-[11px] md:text-xs font-bold tracking-[0.14em] uppercase text-[#111111] mb-10">
              AS FEATURED IN
            </span>
          </Reveal>

          <Reveal delay={0.2} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-14 sm:gap-20 md:gap-28 opacity-85">
              {/* HGTV Logo */}
              <div className="text-2xl sm:text-3xl font-black italic tracking-tighter text-[#111111]">
                HGTV
              </div>

              {/* eXp Realty Logo */}
              <div className="flex flex-col items-center leading-none">
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#111111]">
                  exp
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#333333] uppercase">
                  REALTY
                </span>
              </div>

              {/* FORTUNE Magazine Logo */}
              <div className="flex flex-col items-center leading-none">
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-[#111111] uppercase">
                  FORTUNE
                </span>
                <span className="text-[8px] font-sans font-semibold tracking-[0.3em] text-[#444444] uppercase mt-0.5">
                  MAGAZINE
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
