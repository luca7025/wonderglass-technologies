import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
      className="py-24 md:py-36 bg-[#1a1a1a] text-[#ffffff] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 text-center">
        {/* Kicker & Heading */}
        <span className="block text-[11px] md:text-xs font-bold tracking-[0.16em] uppercase text-[#888888] mb-3">
          HEAR OUR CLIENT
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#ffffff] mb-12 md:mb-16">
          REVIEWS
        </h2>

        {/* Centered Testimonial with AnimatePresence */}
        <div className="max-w-[860px] mx-auto min-h-[160px] md:min-h-[180px] flex items-center justify-center mb-10 px-4">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 280, damping: 30 },
                opacity: { duration: 0.35 },
              }}
              className="flex flex-col items-center"
            >
              <p className="text-base sm:text-lg md:text-[22px] font-normal leading-[1.7] text-[#f1f1f1] italic">
                “{currentReview.quote}”
              </p>
              {currentReview.author && (
                <span className="mt-6 text-[13px] font-medium tracking-wide text-[#aaaaaa]">
                  — {currentReview.author}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pill Left/Right Navigation Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous testimonial"
            className="w-16 sm:w-18 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => paginate(1)}
            aria-label="Next testimonial"
            className="w-16 sm:w-18 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors"
          >
            <ArrowRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  )
}
