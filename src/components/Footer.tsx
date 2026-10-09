import React, { useState } from 'react'

export const Footer: React.FC = () => {
  const [newsletterSent, setNewsletterSent] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterSent(true)
    setTimeout(() => setNewsletterSent(false), 4000)
  }

  return (
    <footer className="border-t border-[#e6e7ea] pt-20 pb-12 bg-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16">
          {/* Column 1: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-tight text-[#111111] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['About', 'Services', 'Projects', 'Gallery', 'Reviews'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[13px] text-[#555555] hover:text-[#000000] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-tight text-[#111111] mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {['Style guide', 'Licenses', 'Changelog'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[#555555] hover:text-[#000000] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-tight text-[#111111] mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hi@woodland.com"
                  className="text-[13px] text-[#555555] hover:text-[#000000] transition-colors"
                >
                  hi@woodland.com
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#555555] hover:text-[#000000] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#555555] hover:text-[#000000] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-[14px] font-bold uppercase tracking-tight text-[#111111] mb-5">
              Newsletter
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <label className="text-[12px] text-[#666666]">
                Your email address
              </label>
              <input
                type="email"
                required
                placeholder="name@email.com"
                className="w-full bg-[#f4f5f7] px-4 py-3 rounded-[2px] text-[13px] text-[#111111] border border-transparent focus:outline-none focus:border-[#111111] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#111111] text-[#ffffff] text-[12px] font-bold tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#282828] active:scale-[0.99] transition-all"
              >
                {newsletterSent ? 'SUBSCRIBED ✓' : 'SUBMIT'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Sub-Footer Row */}
        <div className="pt-8 border-t border-[#f0f0f0] flex items-center gap-6">
          <a
            href="#privacy"
            className="text-[12px] text-[#777777] hover:text-[#000000] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#cookies"
            className="text-[12px] text-[#777777] hover:text-[#000000] transition-colors"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
