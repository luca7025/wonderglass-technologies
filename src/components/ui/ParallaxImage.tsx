import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { cn } from '../../lib/utils'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  offset?: number
  priority?: boolean
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
  offset = 60,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-offset, offset]
  )
  const y = useSpring(rawY, { stiffness: 300, damping: 40 })

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full relative overflow-hidden"
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ y, scale: shouldReduceMotion ? 1 : 1.15 }}
          className={cn(
            'w-full h-full object-cover origin-center',
            imageClassName
          )}
        />
      </motion.div>
    </div>
  )
}
