import React, { useState, useEffect, useRef } from 'react'
import { CipherReveal } from './CipherReveal'

export interface SplashProps {
  text?: string
  hold?: number
  fade?: number
  storageKey?: string
}

export const Splash: React.FC<SplashProps> = ({
  text = 'Ideas into reality',
  hold = 600,
  fade = 600,
  storageKey = 'splash-seen',
}) => {
  const [mounted, setMounted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      return !sessionStorage.getItem(storageKey)
    } catch {
      return false
    }
  })

  const [isLeaving, setIsLeaving] = useState(false)
  const holdTimerRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mounted) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [mounted])

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) {
        window.clearTimeout(holdTimerRef.current)
      }
      if (fadeTimerRef.current !== null) {
        window.clearTimeout(fadeTimerRef.current)
      }
    }
  }, [])

  const handleDone = () => {
    holdTimerRef.current = window.setTimeout(() => {
      setIsLeaving(true)

      fadeTimerRef.current = window.setTimeout(() => {
        try {
          sessionStorage.setItem(storageKey, 'true')
        } catch {
          // ignore storage quota / sandbox errors
        }
        setMounted(false)
      }, fade)
    }, hold)
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(28px, 6vw, 64px)',
        fontWeight: 500,
        letterSpacing: '-0.02em',
        opacity: isLeaving ? 0 : 1,
        pointerEvents: isLeaving ? 'none' : 'auto',
        transition: `opacity ${fade}ms ease`,
      }}
    >
      <CipherReveal
        text={text}
        replayOnHover={false}
        onDone={handleDone}
      />
    </div>
  )
}
