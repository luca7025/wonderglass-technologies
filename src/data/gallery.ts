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
    title: 'Lakeside Pavilion',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-64 md:h-72',
    speed: -90,
  },
  {
    id: 'g2',
    title: 'Terracotta & Green Arch',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-80 md:h-[440px] -mt-6 md:-mt-12',
    speed: 130,
  },
  {
    id: 'g3',
    title: 'Contemporary Leather Loft',
    image:
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-64 md:h-80',
    speed: -150,
  },
  {
    id: 'g4',
    title: 'Sculptural Pavilion Reflection',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-5 h-72 md:h-96 mt-4 md:mt-8',
    speed: 80,
  },
  {
    id: 'g5',
    title: 'Grand Marble Entry Foyer',
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 h-80 md:h-[380px]',
    speed: -120,
  },
  {
    id: 'g6',
    title: 'Minimalist Dining Horizon',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    className: 'col-span-12 sm:col-span-6 md:col-span-3 h-64 md:h-72 mt-6 md:mt-12',
    speed: 160,
  },
]
