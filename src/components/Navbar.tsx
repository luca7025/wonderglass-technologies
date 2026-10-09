import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [prevScroll, setPrevScroll] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - prevScroll
    if (latest > 100 && diff > 10) {
      setHidden(true)
    } else if (diff < -10) {
      setHidden(false)
    }
    setPrevScroll(latest)
  })

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md border-b border-black/[0.04]"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 h-20 md:h-[88px] flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex flex-col group">
          <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#111111] leading-none transition-opacity group-hover:opacity-80">
            WOODLAND
          </span>
          <span className="text-[11px] text-[#666666] tracking-wide mt-1">
            Spaces like home since 2010
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] lg:text-[14px] font-medium text-[#333333] hover:text-[#000000] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#111111] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#ffffff] border-b border-[#e5e5e5] px-6 py-6 flex flex-col gap-4 shadow-xl"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-[#222222] hover:text-[#000000] py-1"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
