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

  const [submitError, setSubmitError] = useState(false)

  // Netlify Forms; the hidden "contact" form in index.html registers the fields at deploy.
  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(false)
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'contact', ...data }).toString(),
    }).catch(() => null)
    if (!res?.ok) {
      setSubmitError(true)
      return
    }
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
              <p className="text-[13.5px] md:text-[14px] leading-[1.75] text-[#555555] mb-6 max-w-[520px]">
                If you are planning a modern architectural project, luxury villa,
                or commercial space in the UAE, share your requirements to connect
                with our engineering specialists for a bespoke glass and shading consultation.
              </p>
            </Reveal>

            {/* Quick Mobile Contact Badges */}
            <Reveal delay={0.12} direction="up">
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <a
                  href="tel:+971567233399"
                  className="px-3.5 py-2 bg-[#f4f5f7] hover:bg-[#e5e7eb] text-[#111111] text-[12px] font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
                >
                  <span>📞 Call: +971 56 723 3399</span>
                </a>
                <a
                  href="https://wa.me/971567233399"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-[#f4f5f7] hover:bg-[#e5e7eb] text-[#111111] text-[12px] font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
                >
                  <span>💬 WhatsApp</span>
                </a>
                <a
                  href="mailto:info@wonderglass.ae"
                  className="px-3.5 py-2 bg-[#f4f5f7] hover:bg-[#e5e7eb] text-[#111111] text-[12px] font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
                >
                  <span>✉️ Email</span>
                </a>
              </div>
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
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-base sm:text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
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
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-base sm:text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
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
                    placeholder="Describe your architectural or glazing requirements..."
                    className="w-full bg-[#f4f5f7] px-4 py-3.5 rounded-[2px] text-base sm:text-[14px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all resize-y"
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
                  className="w-full py-4 px-6 bg-[#111111] text-[#ffffff] text-[13px] font-bold tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#282828] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitted ? 'MESSAGE SENT ✓' : isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
                </button>
                {submitError && (
                  <p role="alert" className="mt-3 text-[12px] text-red-600">
                    Could not send your inquiry. Please try again or call us directly.
                  </p>
                )}
              </Reveal>
            </form>
          </div>

          {/* Right Column: Tall Architecture Image with Parallax & Reveal */}
          <div className="lg:col-span-6 w-full h-[450px] sm:h-[550px] lg:h-[640px] rounded-[2px] overflow-hidden">
            <ParallaxImage
              src="https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-5-1300x887-1.png"
              alt="WonderGlass Technologies Architectural Glass System"
              offset={50}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
