import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ParallaxImage } from './ui/ParallaxImage'
import { Reveal } from './ui/Reveal'

const contactSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  projectDescription: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters about your project' }),
})

type ContactFormData = z.infer<typeof contactSchema>

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormData) => {
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-24 md:py-36 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & Validated Form */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal direction="up">
              <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black uppercase tracking-tight text-[#111111] leading-[0.95] mb-6">
                PARTNER WITH US
              </h2>
            </Reveal>

            <Reveal delay={0.1} direction="up">
              <p className="text-[13.5px] md:text-[14px] leading-[1.75] text-[#555555] mb-10 max-w-[520px]">
                If you're someone who's looking to bring a space to life, share
                a few details to help me reach out to you so we can discuss how
                to bring your vision to life.
              </p>
            </Reveal>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <Reveal delay={0.15} direction="up">
                <div className="flex flex-col gap-2">
                  <label className="text-[12.5px] font-semibold text-[#222222]">
                    Your full name
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="John Doe"
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-600 mt-0.5">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Email Address */}
              <Reveal delay={0.2} direction="up">
                <div className="flex flex-col gap-2">
                  <label className="text-[12.5px] font-semibold text-[#222222]">
                    Your email address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-600 mt-0.5">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Project Description */}
              <Reveal delay={0.25} direction="up">
                <div className="flex flex-col gap-2">
                  <label className="text-[12.5px] font-semibold text-[#222222]">
                    A little bit about your project
                  </label>
                  <textarea
                    rows={4}
                    {...register('projectDescription')}
                    placeholder="Example Text"
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all resize-y"
                  />
                  {errors.projectDescription && (
                    <span className="text-xs text-red-600 mt-0.5">
                      {errors.projectDescription.message}
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Black SUBMIT Button */}
              <Reveal delay={0.3} direction="up">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#111111] text-[#ffffff] text-[13px] font-bold tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#282828] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {submitted ? 'MESSAGE SENT ✓' : isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </Reveal>
            </form>
          </div>

          {/* Right Column: Tall Architecture Image with Parallax & Reveal */}
          <div className="lg:col-span-6 w-full h-[450px] sm:h-[550px] lg:h-[640px] rounded-[2px] overflow-hidden">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85"
              alt="Woodland Architecture Curved Minimalist Facade"
              offset={50}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
