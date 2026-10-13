export interface GalleryItem {
  id: string
  title: string
  image: string
  className: string
  speed: number
}

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Vertilux Guillotine Glass System',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-6-1300x887-1.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-64 md:h-72',
    speed: -90,
  },
  {
    id: 'g2',
    title: 'Switchable Smart Glass Solutions',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-4-1300x887-1.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-80 md:h-[440px] -mt-6 md:-mt-12',
    speed: 130,
  },
  {
    id: 'g3',
    title: 'SkyBreeze Bioclimatic Pergola UAE',
    image:
      'https://wonderglass.ae/wp-content/uploads/2026/02/Retractable-Fabric-Roof-in-UAE.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-64 md:h-80',
    speed: -150,
  },
  {
    id: 'g4',
    title: 'Architectural Glazing & Facades',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-5-1300x887-1.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-5 h-72 md:h-96 mt-4 md:mt-8',
    speed: 80,
  },
  {
    id: 'g5',
    title: 'Z-Lock Motorised Outdoor Shading',
    image:
      'https://wonderglass.ae/wp-content/uploads/2026/02/Motorised-Outdoor-Blinds-in-Dubai-UAE.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-80 md:h-[380px]',
    speed: -120,
  },
  {
    id: 'g6',
    title: 'PDLC Privacy Glass Dubai',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-2-1-1300x887-1.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-3 h-64 md:h-72 mt-6 md:mt-12',
    speed: 160,
  },
]
