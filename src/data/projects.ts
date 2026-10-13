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
    id: 'palm-jumeirah-villa',
    title: 'Palm Jumeirah Villa',
    meta: 'Dubai • Luxury Residential • 2024',
    description:
      'Turnkey installation of PDLC switchable privacy glass partitions, Vertilux guillotine sliding glass, and motorized architectural shading providing uninterrupted Arabian Gulf views with complete on-demand privacy.',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-6-1300x887-1.png',
    align: 'right',
  },
  {
    id: 'difc-corporate-headquarters',
    title: 'DIFC Executive Offices',
    meta: 'Dubai • Commercial Fit-out • 2024',
    description:
      'Smart glass boardroom partitions engineered for instant acoustic dampening and digital privacy transitions at the tap of a button, blending minimalist aesthetics with high-security confidentiality.',
    image:
      'https://wonderglass.ae/wp-content/uploads/2025/06/Mask-group-2-1-1300x887-1.png',
    align: 'left',
  },
  {
    id: 'emirates-hills-estate',
    title: 'Emirates Hills Residence',
    meta: 'Dubai • Private Estate • 2024',
    description:
      'Custom SkyBreeze bioclimatic pergola integrated with Z-Lock heavy-duty motorized outdoor blinds, transforming the outdoor poolside terrace into an air-shielded, climate-controlled year-round lounge.',
    image:
      'https://wonderglass.ae/wp-content/uploads/2026/02/Retractable-Fabric-Roof-in-UAE.jpg',
    align: 'right',
  },
]
