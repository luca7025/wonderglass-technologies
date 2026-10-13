import React, { useState, useEffect } from 'react'

export interface SplashProps {
  hold?: number
  clear?: number
  storageKey?: string
}

// Smart-glass opening: the site sits behind frosted glass with the logo,
// light glints across it, then the glass "switches" clear like PDLC film.
// Keyframes live in index.css (splash-*).
export const Splash: React.FC<SplashProps> = ({
  hold = 2400,
  clear = 1000,
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
  const [isClear, setIsClear] = useState(false)

  useEffect(() => {
    if (!mounted) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const holdMs = reduced ? 600 : hold
    const clearMs = reduced ? 0 : clear

    const holdId = window.setTimeout(() => setIsClear(true), holdMs)
    const doneId = window.setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, 'true')
      } catch {
        // ignore storage quota / sandbox errors
      }
      setMounted(false)
    }, holdMs + clearMs)

    return () => {
      document.body.style.overflow = originalOverflow
      window.clearTimeout(holdId)
      window.clearTimeout(doneId)
    }
  }, [mounted, hold, clear, storageKey])

  if (!mounted) return null

  const blur = isClear ? 'blur(0px)' : 'blur(30px) saturate(1.3)'
  const ease = 'cubic-bezier(0.65, 0, 0.35, 1)'

  return (
    <div
      role="status"
      aria-label="Loading WonderGlass"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        pointerEvents: isClear ? 'none' : 'auto',
        transition: `backdrop-filter ${clear}ms ${ease}, -webkit-backdrop-filter ${clear}ms ${ease}`,
      }}
    >
      {/* Frost tint, denser at the edges so the navbar/chat button don't show through on phones */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(248,249,250,0.74) 0%, rgba(248,249,250,0.8) 40%, rgba(248,249,250,0.98) 70%)',
          opacity: isClear ? 0 : 1,
          transition: `opacity ${clear}ms ${ease}`,
        }}
      />
      {/* Faint panel joints so it reads as a glass façade, not a white screen */}
      <div
        aria-hidden="true"
        className="splash-mullions"
        style={{ opacity: isClear ? 0 : 1, transition: `opacity ${clear * 0.6}ms ${ease}` }}
      />

      {/* Diagonal light reflection sweeping across the glass */}
      <div aria-hidden="true" className="splash-sheen" />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: isClear ? 0 : 1,
          transform: isClear ? 'scale(1.06)' : 'scale(1)',
          filter: isClear ? 'blur(6px)' : 'blur(0px)',
          transition: `opacity ${clear * 0.7}ms ${ease}, transform ${clear}ms ${ease}, filter ${clear * 0.7}ms ${ease}`,
        }}
      >
        <img
          src="/wonderglass-logo.png"
          alt="WonderGlass Technologies"
          className="splash-rise"
          style={{ width: 'clamp(200px, 42vw, 340px)', height: 'auto' }}
        />
        <p className="splash-tagline">Architectural Glass &amp; Systems</p>
        <div aria-hidden="true" className="splash-track">
          <div className="splash-progress" style={{ animationDuration: `${hold - 900}ms` }} />
        </div>
      </div>
    </div>
  )
}
