import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight, Star } from 'lucide-react'
import { reviewsData } from '../data/reviews'

export const Reviews: React.FC = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])

  const currentIndex =
    ((page % reviewsData.length) + reviewsData.length) % reviewsData.length
  const currentReview = reviewsData[currentIndex]

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  }

  return (
    <section
      id="reviews"
      className="py-20 md:py-36 bg-[#1a1a1a] text-[#ffffff] overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 text-center">
        {/* Kicker & Heading */}
        <span className="block text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#888888] mb-3">
          CLIENT EXPERIENCES & FEEDBACK
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#ffffff] mb-6 md:mb-12">
          CLIENT REVIEWS
        </h2>

        {/* 5 Stars Rating Bar */}
        <div className="flex items-center justify-center gap-1 mb-8 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
          ))}
          <span className="ml-2 text-xs font-semibold text-[#aaaaaa]">
            5.0 Verified Client Rating
          </span>
        </div>

        {/* Centered Testimonial with AnimatePresence and Touch Drag */}
        <div className="max-w-[860px] mx-auto min-h-[170px] md:min-h-[190px] flex items-center justify-center mb-8 px-2 select-none touch-pan-y">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = offset.x
                if (swipe < -40 || velocity.x < -400) {
                  paginate(1)
                } else if (swipe > 40 || velocity.x > 400) {
                  paginate(-1)
                }
              }}
              transition={{
                x: { type: 'spring', stiffness: 280, damping: 30 },
                opacity: { duration: 0.35 },
              }}
              className="flex flex-col items-center cursor-grab active:cursor-grabbing w-full"
            >
              <p className="text-base sm:text-lg md:text-[22px] font-normal leading-[1.7] text-[#f1f1f1] italic">
                “{currentReview.quote}”
              </p>
              {currentReview.author && (
                <div className="mt-6 flex flex-col items-center gap-1">
                  <span className="text-[13px] md:text-[14px] font-semibold tracking-wide text-[#ffffff]">
                    {currentReview.author}
                  </span>
                  <span className="text-[11px] font-mono tracking-wider text-[#777777] uppercase">
                    United Arab Emirates
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swipe Hint on Mobile */}
        <p className="block sm:hidden text-[11px] text-[#666666] tracking-wide mb-6">
          Swipe left / right or tap arrows
        </p>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {reviewsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const diff = idx - currentIndex
                if (diff !== 0) paginate(diff)
              }}
              aria-label={`Go to review ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Pill Left/Right Navigation Buttons */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="w-14 sm:w-18 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="w-14 sm:w-18 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}

