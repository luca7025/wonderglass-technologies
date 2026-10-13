import React, { useState, useEffect, useRef, useCallback } from 'react'

export interface CipherRevealProps {
  text: string
  duration?: number
  lead?: number
  scrambleFps?: number
  replayOnHover?: boolean
  onDone?: () => void
  className?: string
  style?: React.CSSProperties
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function getRandomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export const CipherReveal: React.FC<CipherRevealProps> = ({
  text,
  duration = 1100,
  lead = 8,
  scrambleFps = 30,
  replayOnHover = true,
  onDone,
  className,
  style,
}) => {
  const [resolvedIndex, setResolvedIndex] = useState(0)
  const [scrambledText, setScrambledText] = useState('')

  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  const hasCalledDone = useRef(false)
  const frameRef = useRef<number | null>(null)

  const startAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setResolvedIndex(text.length)
      setScrambledText('')
      if (!hasCalledDone.current) {
        hasCalledDone.current = true
        onDoneRef.current?.()
      }
      return
    }

    hasCalledDone.current = false
    setResolvedIndex(0)
    setScrambledText('')

    const startTime = performance.now()
    let lastScrambleTime = 0
    const scrambleInterval = 1000 / scrambleFps

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(1, elapsed / duration)

      const targetResolved = Math.min(
        text.length,
        Math.floor(progress * text.length)
      )
      setResolvedIndex(targetResolved)

      if (progress >= 1) {
        setResolvedIndex(text.length)
        setScrambledText('')
        if (!hasCalledDone.current) {
          hasCalledDone.current = true
          onDoneRef.current?.()
        }
        return
      }

      if (currentTime - lastScrambleTime >= scrambleInterval) {
        lastScrambleTime = currentTime

        const currentLead = Math.min(
          lead,
          Math.max(2, Math.floor(progress * lead * 2) + 2)
        )
        const scrambleEnd = Math.min(text.length, targetResolved + currentLead)

        let scrambled = ''
        for (let i = targetResolved; i < scrambleEnd; i++) {
          if (text[i] === ' ') {
            scrambled += ' '
          } else {
            scrambled += getRandomChar()
          }
        }
        setScrambledText(scrambled)
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
  }, [text, duration, lead, scrambleFps])

  useEffect(() => {
    const animId = requestAnimationFrame(() => {
      startAnimation()
    })
    return () => {
      cancelAnimationFrame(animId)
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [startAnimation])

  const handleMouseEnter = () => {
    if (replayOnHover) {
      startAnimation()
    }
  }

  const resolvedPart = text.slice(0, resolvedIndex)

  return (
    <span
      role="text"
      aria-label={text}
      className={className}
      onMouseEnter={handleMouseEnter}
      style={{
        display: 'inline-grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        ...style,
      }}
    >
      {/* Invisible layer reserving full final text size without layout shift */}
      <span
        aria-hidden="true"
        style={{
          gridArea: '1 / 1',
          visibility: 'hidden',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </span>

      {/* Animated text layer */}
      <span
        aria-hidden="true"
        style={{
          gridArea: '1 / 1',
          whiteSpace: 'pre-wrap',
        }}
      >
        <span style={{ color: 'inherit', opacity: 1 }}>{resolvedPart}</span>
        <span style={{ color: 'inherit', opacity: 0.45 }}>{scrambledText}</span>
      </span>
    </span>
  )
}
