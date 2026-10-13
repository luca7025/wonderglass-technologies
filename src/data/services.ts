export interface ServiceItem {
  number: string
  title: string
  description: string
  bullets: string[]
  image: string
}

export const servicesData: ServiceItem[] = [
  {
    number: '01',
    title: 'Smart Glass & Film',
    description:
      'Switchable Smart Glass by WonderGlass Technologies redefines privacy in seconds. One touch changes transparent to opaque, elevating your space with clean design and advanced smart glass technology.',
    bullets: [
      'PDLC Smart Switchable Film',
      'Instant Privacy on Demand',
      'Solar Heat & UV Rejection',
      'Turnkey Installation in UAE',
    ],
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-4-1300x887-1.png',
  },
  {
    number: '02',
    title: 'Vertilux Guillotine Glass',
    description:
      'Vertilux by WonderGlass Technologies delivers an Automatic Vertical Sliding Glass System in Dubai, offering smooth motorized vertical movement, unobstructed views, and flexible space control.',
    bullets: [
      'Motorized Vertical Sliding',
      'Acoustic & Weather Protection',
      'Built-in Glass Balustrade',
      'Commercial & Villa Integration',
    ],
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-6-1300x887-1.png',
  },
  {
    number: '03',
    title: 'SkyFold & Skylights',
    description:
      'Skyfold Glass Solutions offer a smart way to enclose and open spaces effortlessly. This automatic movable glassroom and retractable skylight system allows instant control over openness, light, and protection.',
    bullets: [
      'Retractable Glass Sunrooms',
      'Motorized Skylight Systems',
      'Year-Round Climate Control',
      'Automated Weather Sensors',
    ],
    image:
      'https://wonderglass.ae/wp-content/uploads/2026/02/Retractable-Fabric-Roof-in-UAE.jpg',
  },
  {
    number: '04',
    title: 'Z-Lock & Motorised Shading',
    description:
      'Z-Lock by WonderGlass Technologies is a premium Motorised Outdoor Blinds system in Dubai, UAE designed to block extreme sunlight, wind, dust, and rain while enhancing comfort in outdoor living spaces.',
    bullets: [
      'Z-Lock Windproof Track System',
      'SkyReel Retractable Shading',
      'Somfy & Smart Home Sync',
      'High Thermal Heat Insulation',
    ],
    image:
      'https://wonderglass.ae/wp-content/uploads/2026/02/Motorised-Outdoor-Blinds-in-Dubai-UAE.jpg',
  },
]
