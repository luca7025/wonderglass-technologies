export interface ServiceItem {
  number: string
  title: string
  description: string
  bullets: string[]
  image: string
}

export interface ProjectItem {
  id: string
  title: string
  meta: string
  description: string
  image: string
  align: 'left' | 'right'
}

export interface ReviewItem {
  id: string
  quote: string
  author: string
}

export interface GalleryItem {
  id: string
  title: string
  image: string
  className: string
  speed: number
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LocationItem {
  id: 'abudhabi' | 'dubai'
  city: string
  title: string
  subtitle: string
  address: string
  coordinates: string
  phone: string
  displayPhone: string
  email: string
  hours: string
  features: string[]
  mapEmbedUrl: string
  googleMapsUrl: string
}
