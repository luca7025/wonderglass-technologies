import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  MapPin,
  Navigation,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Building2,
  Car,
  Compass,
  Layers,
} from 'lucide-react'
import { Reveal } from './ui/Reveal'
import type { LocationItem } from '../types'

const LOCATIONS: LocationItem[] = [
  {
    id: 'abudhabi',
    city: 'Abu Dhabi',
    title: 'Headquarters & Experience Showroom',
    subtitle: 'Flagship Experience Center & Engineering Office',
    address: 'Al Sawari Tower B, Corniche Street, Al Khubeirah, Abu Dhabi, United Arab Emirates',
    coordinates: '24.4756° N, 54.3453° E',
    phone: '+971567233399',
    displayPhone: '+971 56 723 3399',
    email: 'info@wonderglass.ae',
    hours: 'Mon – Fri: 8:30 AM – 6:30 PM | Sat: 9:00 AM – 3:00 PM',
    features: [
      'Live Guillotine Glass & Vertilux Demonstrations',
      'Interactive Smart PDLC Switchable Film Wall',
      'SkyFold Solarium & Bioclimatic Pergola Mockups',
      'Private Architect & VIP Client Meeting Lounge',
    ],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Al+Sawari+Tower+B+Corniche+St+Abu+Dhabi&output=embed',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Al+Sawari+Tower+B+Corniche+St+Abu+Dhabi',
  },
  {
    id: 'dubai',
    city: 'Dubai',
    title: 'Dubai Regional & Fabrication Hub',
    subtitle: 'Technical Testing, Logistics & Regional Advisory',
    address: 'Al Quoz Industrial Area 3, Dubai, United Arab Emirates',
    coordinates: '25.1281° N, 55.2165° E',
    phone: '+971567233399',
    displayPhone: '+971 56 723 3399',
    email: 'dubai@wonderglass.ae',
    hours: 'Mon – Fri: 8:00 AM – 5:30 PM | Sat: By Appointment',
    features: [
      'Custom Glass Fabrication & Quality Assurance',
      'Structural Facade Rig & Wind-load Testing',
      'Motorized Drive System Bench Testing',
      'UAE-Wide Rapid Dispatch & Field Engineering Teams',
    ],
    mapEmbedUrl:
      'https://www.google.com/maps?q=Al+Quoz+Industrial+Area+3+Dubai+UAE&output=embed',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Al+Quoz+Industrial+Area+3+Dubai+UAE',
  },
]

export const Location: React.FC = () => {
  const [activeLocationId, setActiveLocationId] = useState<'abudhabi' | 'dubai'>('abudhabi')
  const [copied, setCopied] = useState(false)

  const activeLocation = LOCATIONS.find((loc) => loc.id === activeLocationId) || LOCATIONS[0]

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeLocation.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="location" className="py-24 md:py-36 bg-[#f9fafb] border-t border-[#e5e7eb] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-[680px]">
            <Reveal direction="up">
              <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#666666] block mb-3">
                Experience Center & Regional Offices
              </span>
            </Reveal>
            <Reveal delay={0.1} direction="up">
              <h2 className="text-4xl sm:text-5xl md:text-[54px] font-black uppercase tracking-tight text-[#111111] leading-[0.95]">
                VISIT OUR SHOWROOM
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="up">
            <p className="text-[13.5px] md:text-[14px] leading-[1.75] text-[#555555] max-w-[460px]">
              Explore 1:1 scale motorized guillotine glass, switchable smart film, and solarium systems
              in person. Meet our facade engineers for project consultations.
            </p>
          </Reveal>
        </div>

        {/* Location Tabs / Segmented Switcher */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3 mb-8">
          {LOCATIONS.map((loc) => {
            const isActive = loc.id === activeLocationId
            return (
              <motion.button
                key={loc.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveLocationId(loc.id)}
                className={`relative px-4 sm:px-6 py-3.5 rounded-[2px] text-[12.5px] sm:text-[13px] font-bold tracking-[0.05em] uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-[#ffffff] shadow-sm'
                    : 'bg-[#ffffff] text-[#555555] hover:text-[#111111] hover:bg-[#f3f4f6] border border-[#e5e7eb]'
                }`}
              >
                <Building2 size={15} className={isActive ? 'text-[#ffffff]' : 'text-[#777777]'} />
                <span>{loc.city}</span>
                {isActive && (
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Main Location Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Location Card Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#ffffff] border border-[#e5e7eb] rounded-[3px] p-7 sm:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-7"
              >
                {/* Header Info */}
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#f3f4f6] text-[#333333] text-[11px] font-semibold tracking-wide uppercase rounded-[2px] mb-3">
                    <MapPin size={12} className="text-[#111111]" />
                    {activeLocation.city} Facility
                  </div>
                  <h3 className="text-2xl sm:text-[26px] font-bold text-[#111111] tracking-tight leading-snug">
                    {activeLocation.title}
                  </h3>
                  <p className="text-[13px] text-[#666666] mt-1">{activeLocation.subtitle}</p>
                </div>

                {/* Address & Coordinates */}
                <div className="space-y-3 pt-2 border-t border-[#f0f0f0]">
                  <div className="flex items-start gap-3.5">
                    <MapPin size={18} className="text-[#111111] mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-[13.5px] leading-relaxed font-medium text-[#222222]">
                        {activeLocation.address}
                      </p>
                      <span className="text-[11.5px] text-[#888888] font-mono block mt-1">
                        GPS: {activeLocation.coordinates}
                      </span>
                    </div>
                  </div>

                  {/* Copy Address Button */}
                  <div className="pl-8">
                    <button
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#555555] hover:text-[#111111] transition-colors py-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check size={14} className="text-emerald-600" />
                          <span className="text-emerald-700">Address copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Contact & Hours */}
                <div className="space-y-3 pt-2 border-t border-[#f0f0f0]">
                  <div className="flex items-center gap-3.5">
                    <Phone size={17} className="text-[#111111] shrink-0" />
                    <a
                      href={`tel:${activeLocation.phone}`}
                      className="text-[13.5px] font-medium text-[#222222] hover:text-[#000000] underline-offset-4 hover:underline transition-colors"
                    >
                      {activeLocation.displayPhone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Mail size={17} className="text-[#111111] shrink-0" />
                    <a
                      href={`mailto:${activeLocation.email}`}
                      className="text-[13.5px] font-medium text-[#222222] hover:text-[#000000] underline-offset-4 hover:underline transition-colors"
                    >
                      {activeLocation.email}
                    </a>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock size={17} className="text-[#111111] mt-0.5 shrink-0" />
                    <span className="text-[13px] text-[#555555] leading-relaxed">
                      {activeLocation.hours}
                    </span>
                  </div>
                </div>

                {/* Showroom Features */}
                <div className="pt-2 border-t border-[#f0f0f0]">
                  <h4 className="text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#333333] mb-3">
                    Facility Highlights
                  </h4>
                  <ul className="space-y-2">
                    {activeLocation.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12.5px] text-[#555555]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111] mt-1.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Action Buttons */}
            <div className="pt-7 mt-7 border-t border-[#e5e7eb] flex flex-col sm:flex-row gap-3">
              <a
                href={activeLocation.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 px-5 bg-[#111111] text-[#ffffff] text-[12.5px] font-bold tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#282828] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-center"
              >
                <Navigation size={15} />
                <span>Get Directions</span>
                <ExternalLink size={13} className="opacity-70" />
              </a>

              <a
                href={`tel:${activeLocation.phone}`}
                className="py-3.5 px-5 bg-[#f3f4f6] text-[#111111] text-[12.5px] font-bold tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#e5e7eb] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone size={15} />
                <span>Call Center</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col min-h-[400px] sm:min-h-[540px] lg:min-h-[620px] bg-[#ffffff] border border-[#e5e7eb] rounded-[3px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative">
            {/* Top Bar for Map */}
            <div className="px-5 py-3.5 bg-[#ffffff] border-b border-[#e5e7eb] flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide">
                  {activeLocation.city} Map View
                </span>
                <span className="text-[12px] text-[#888888] hidden sm:inline">•</span>
                <span className="text-[12px] text-[#666666] hidden sm:inline">
                  {activeLocation.id === 'abudhabi' ? 'Corniche Road' : 'Al Quoz Ind. 3'}
                </span>
              </div>

              <a
                href={activeLocation.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#111111] hover:text-[#555555] transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Map Container */}
            <div className="relative flex-1 w-full h-full bg-[#f0f0f0]">
              <iframe
                title={`WonderGlass ${activeLocation.city} Map`}
                src={activeLocation.mapEmbedUrl}
                className="w-full h-full min-h-[360px] sm:min-h-[480px] lg:min-h-[560px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-[340px] bg-[#ffffff]/95 backdrop-blur-md p-4 rounded-[2px] border border-black/10 shadow-lg pointer-events-auto">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#111111] text-[#ffffff] flex items-center justify-center shrink-0 mt-0.5">
                    <Compass size={16} />
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-[#111111] leading-tight">
                      WonderGlass {activeLocation.city}
                    </h5>
                    <p className="text-[11.5px] text-[#555555] mt-1 leading-snug">
                      {activeLocation.address}
                    </p>
                    <a
                      href={activeLocation.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#111111] mt-2 underline hover:text-[#666666] transition-colors"
                    >
                      <Navigation size={11} />
                      Navigate via Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Luxury Experience Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[2px] p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center shrink-0 text-[#111111]">
              <Car size={18} />
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#111111] uppercase tracking-wide">
                Dedicated Valet & Parking
              </h4>
              <p className="text-[12.5px] text-[#666666] mt-1 leading-relaxed">
                Complimentary basement & valet parking for visiting clients and consultants at Al Sawari Tower.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[2px] p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center shrink-0 text-[#111111]">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#111111] uppercase tracking-wide">
                Live 1:1 Operating Mockups
              </h4>
              <p className="text-[12.5px] text-[#666666] mt-1 leading-relaxed">
                Test touch controls, remote automated drives, and acoustic attenuation on life-sized installations.
              </p>
            </div>
          </div>

          <div className="bg-[#ffffff] border border-[#e5e7eb] rounded-[2px] p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#f4f5f7] flex items-center justify-center shrink-0 text-[#111111]">
              <Building2 size={18} />
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#111111] uppercase tracking-wide">
                Private Consultation Suites
              </h4>
              <p className="text-[12.5px] text-[#666666] mt-1 leading-relaxed">
                Schedule one-on-one technical sessions with senior facade engineers and estimating directors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
