import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { Menu, X, Phone, MapPin, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Services', href: '#services', num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Gallery', href: '#gallery', num: '04' },
  { label: 'Reviews', href: '#reviews', num: '05' },
  { label: 'Location', href: '#location', num: '06' },
  { label: 'Contact', href: '#contact', num: '07' },
]

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [prevScroll, setPrevScroll] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (mobileOpen) return // Don't hide navbar if mobile drawer is open
    const diff = latest - prevScroll
    if (latest > 100 && diff > 10) {
      setHidden(true)
    } else if (diff < -10) {
      setHidden(false)
    }
    setPrevScroll(latest)
  })

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

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
      <div className="w-full px-5 sm:px-10 md:px-14 lg:px-16 h-18 sm:h-20 md:h-[84px] flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group py-2">
          <img
            src="/wonderglass-logo.png"
            alt="WonderGlass Technologies"
            className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02] active:scale-95"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] lg:text-[14px] font-medium text-[#333333] hover:text-[#000000] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#111111] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle with tap animation */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2.5 rounded-full text-[#111111] hover:bg-black/5 active:bg-black/10 focus:outline-none transition-colors"
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Animated Luxury Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 72px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#ffffff]/98 backdrop-blur-2xl border-b border-[#e5e5e5] px-6 py-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
          >
            {/* Links List with Staggered Entrance */}
            <div className="flex flex-col divide-y divide-[#f2f2f2] pt-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 + idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileTap={{ scale: 0.98, x: 4 }}
                  className="py-3.5 flex items-center justify-between text-[#222222] hover:text-[#000000] transition-colors group"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-[11px] font-mono font-medium text-[#888888] tracking-wider">
                      {link.num}
                    </span>
                    <span className="text-[17px] font-semibold tracking-tight text-[#111111]">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-[#999999] group-hover:text-[#111111] group-hover:translate-x-1 transition-all"
                  />
                </motion.a>
              ))}
            </div>

            {/* Quick Contact & Action Section at Drawer Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="pt-6 border-t border-[#ebebeb] space-y-3 mt-4"
            >
              <div className="flex items-center gap-2 text-[12px] text-[#666666]">
                <MapPin size={14} className="text-[#111111]" />
                <span>Al Sawari Tower B, Corniche St, Abu Dhabi</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="tel:+971567233399"
                  className="py-3 px-3.5 bg-[#f4f5f7] hover:bg-[#eaecee] active:scale-95 text-[#111111] text-[12px] font-bold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <Phone size={14} />
                  <span>Call Us</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3.5 bg-[#111111] hover:bg-[#282828] active:scale-95 text-[#ffffff] text-[12px] font-bold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <span>Book Visit</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
