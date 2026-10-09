export interface ProjectItem {
  id: string
  title: string
  meta: string
  description: string
  image: string
  align: 'left' | 'right'
}

export const projectsData: ProjectItem[] = [
  {
    id: 'coastal-villa',
    title: 'Coastal Villa',
    meta: 'Aspen • Residential • 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85',
    align: 'right',
  },
  {
    id: 'willow-loft',
    title: 'The Willow Loft',
    meta: 'Aspen • Residential • 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
    align: 'left',
  },
  {
    id: 'sunshine-retreat',
    title: 'Sunshine Retreat',
    meta: 'Aspen • Residential • 2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
    align: 'right',
  },
]
