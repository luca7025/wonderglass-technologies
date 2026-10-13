import React, { useRef, useState, useEffect } from 'react'
import CountUpRaw from 'react-countup'
import { useInView } from 'motion/react'
import { Reveal } from './ui/Reveal'

// Resolve react-countup component across Vite CJS / ESM bundling variants
const CountUpComponent: any =
  typeof CountUpRaw === 'function'
    ? CountUpRaw
    : (CountUpRaw as any)?.default?.default ||
      (CountUpRaw as any)?.default ||
      CountUpRaw

const STATS_DATA = [
  { end: 500, suffix: '+', label: 'projects completed' },
  { end: 100, suffix: '%', label: 'custom engineered' },
  { end: 10, suffix: '+', label: 'years UAE experience' },
]

const StatCounter: React.FC<{
  end: number
  suffix: string
  isInView: boolean
}> = ({ end, suffix, isInView }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    let animFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / 2200, 1)
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * end))
      if (progress < 1) {
        animFrame = requestAnimationFrame(step)
      }
    }

    animFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animFrame)
  }, [isInView, end])

  if (typeof CountUpComponent === 'function') {
    return (
      <CountUpComponent
        start={0}
        end={end}
        duration={2.5}
        suffix={suffix}
        useEasing={true}
      />
    )
  }

  return <>{isInView ? `${count}${suffix}` : `0${suffix}`}</>
}

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
                  <StatCounter
                    end={item.end}
                    suffix={item.suffix}
                    isInView={isInView}
                  />
                </span>
                <span className="text-[13px] md:text-[14px] text-[#666666]">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trusted Partners */}
        <div className="text-center pt-8 border-t border-[#f0f0f0]">
          <Reveal direction="up">
            <span className="block text-[11px] md:text-xs font-bold tracking-[0.14em] uppercase text-[#111111] mb-10">
              TRUSTED BY UAE INDUSTRY LEADERS
            </span>
          </Reveal>

          <Reveal delay={0.2} direction="up">
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14 md:gap-18 opacity-80">
              <img
                src="https://wonderglass.ae/wp-content/uploads/2025/08/adnoc.png"
                alt="ADNOC"
                className="h-8 sm:h-9 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <img
                src="https://wonderglass.ae/wp-content/uploads/2025/08/Adnec.png"
                alt="ADNEC"
                className="h-8 sm:h-9 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <img
                src="https://wonderglass.ae/wp-content/uploads/2025/08/beeh.png"
                alt="BEEAH"
                className="h-8 sm:h-9 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <img
                src="https://wonderglass.ae/wp-content/uploads/2025/08/Dubai-Hells-Estate.png"
                alt="Dubai Hills Estate"
                className="h-8 sm:h-9 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
              <img
                src="https://wonderglass.ae/wp-content/uploads/2025/08/danoop-Properties.png"
                alt="Danube Properties"
                className="h-8 sm:h-9 object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
