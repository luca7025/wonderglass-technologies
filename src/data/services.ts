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
    title: 'Architecture',
    description:
      'We design buildings that are purposeful, enduring, and deeply connected to their surroundings.',
    bullets: [
      'Concept Design',
      'Architectural Planning',
      '3D Visualization & Modeling',
      'Construction Documentation',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '02',
    title: 'Interior Design',
    description:
      'Beyond surface-level styling, we craft interiors that feel as good as they look.',
    bullets: [
      'Spatial Identity',
      'Material & Finish Selection',
      'Furniture & Lighting Design',
      'Detail Development',
    ],
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '03',
    title: 'Layout Planning',
    description:
      'We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.',
    bullets: [
      'Functional Zoning',
      'Human-Centered Design',
      'Circulation Strategy',
      'Flexibility & Future Use',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    number: '04',
    title: 'Project Management',
    description:
      'We ensure your vision is delivered on time, on budget, and to the highest standards.',
    bullets: [
      'Concept Design',
      'Stakeholder Coordination',
      'Quality Control',
      'Budget & Timeline Tracking',
    ],
    image:
      'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
  },
]
