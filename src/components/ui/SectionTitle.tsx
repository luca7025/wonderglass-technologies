import React from 'react'
import { Reveal } from './Reveal'
import { cn } from '../../lib/utils'

interface SectionTitleProps {
  title: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
  kicker?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  className,
  as: Component = 'h2',
  kicker,
}) => {
  return (
    <Reveal direction="up" className={cn('select-none', className)}>
      {kicker && (
        <span className="block text-[11px] md:text-xs font-bold tracking-[0.14em] uppercase text-[#666] mb-3">
          {kicker}
        </span>
      )}
      <Component className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#111111] leading-[0.92]">
        {title}
      </Component>
    </Reveal>
  )
}
