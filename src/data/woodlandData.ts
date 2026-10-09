export interface ServiceItem {
  id: string
  number: string
  title: string
  description: string
  bullets: string[]
  image: string
}

export interface ProjectItem {
  id: string
  title: string
  location: string
  type: string
  year: string
  description: string
  image: string
  cardPosition: 'left' | 'right'
}

export interface ReviewItem {
  id: string
  quote: string
  author?: string
  project?: string
}

export const WOODLAND_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    number: '01',
    title: 'Architecture',
    description: 'We design buildings that are purposeful, enduring, and deeply connected to their surroundings.',
    bullets: [
      'Concept Design',
      'Architectural Planning',
      '3D Visualization & Modeling',
      'Construction Documentation'
    ],
    image: '/service-arch.jpg'
  },
  {
    id: 's2',
    number: '02',
    title: 'Interior Design',
    description: 'Beyond surface-level styling, we craft interiors that feel as good as they look.',
    bullets: [
      'Spatial Identity',
      'Material & Finish Selection',
      'Furniture & Lighting Design',
      'Detail Development'
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's3',
    number: '03',
    title: 'Layout Planning',
    description: 'We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.',
    bullets: [
      'Functional Zoning',
      'Human-Centered Design',
      'Circulation Strategy',
      'Flexibility & Future Use'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 's4',
    number: '04',
    title: 'Project Management',
    description: 'We ensure your vision is delivered on time, on budget, and to the highest standards.',
    bullets: [
      'Concept Design',
      'Stakeholder Coordination',
      'Quality Control',
      'Budget & Timeline Tracking'
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80'
  }
]

export const WOODLAND_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Coastal Villa',
    location: 'Aspen',
    type: 'Residential',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85',
    cardPosition: 'right'
  },
  {
    id: 'p2',
    title: 'The Willow Loft',
    location: 'Aspen',
    type: 'Residential',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
    cardPosition: 'left'
  },
  {
    id: 'p3',
    title: 'Sunshine Retreat',
    location: 'Aspen',
    type: 'Residential',
    year: '2024',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    cardPosition: 'right'
  }
]

export const WOODLAND_STATS = [
  { value: '316+', label: 'projects completed' },
  { value: '740+', label: 'satisfied customers' },
  { value: '215+', label: 'YTD transactions' }
]

export const FEATURED_BRANDS = [
  { name: 'HGTV', label: 'HGTV' },
  { name: 'exp', label: 'eXp REALTY' },
  { name: 'fortune', label: 'FORTUNE MAGAZINE' }
]

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    title: 'Lakeside Pavilion',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    className: 'gallery-img-1'
  },
  {
    id: 'g2',
    title: 'Terracotta & Olive Arch Dining',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    className: 'gallery-img-2'
  },
  {
    id: 'g3',
    title: 'Leather Loft Living Room',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80',
    className: 'gallery-img-3'
  },
  {
    id: 'g4',
    title: 'Architectural Arch Reflection',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    className: 'gallery-img-4'
  },
  {
    id: 'g5',
    title: 'Grand Marble Entry Foyer',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
    className: 'gallery-img-5'
  }
]

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    quote: '“Working with Woodland Architects was a blessing for our home. We wanted a space that felt modern but still warm and inviting, and they absolutely nailed it. We highly recommend them for architecture and design projects.”'
  },
  {
    id: 'r2',
    quote: '“From conceptual sketches to the final structural build, Woodland demonstrated relentless mastery of light, scale, and natural topography. A truly remarkable firm.”'
  },
  {
    id: 'r3',
    quote: '“Their ability to translate our lifestyle needs into functional, breathtaking architecture made the entire process seamless. The results speak for themselves.”'
  }
]
