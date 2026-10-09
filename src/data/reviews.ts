export interface ReviewItem {
  id: string
  quote: string
  author?: string
}

export const reviewsData: ReviewItem[] = [
  {
    id: 'review-1',
    quote:
      'Working with Woodland Architects was a blessing for our home. We wanted a space that felt modern but still warm and inviting, and they absolutely nailed it. We highly recommend them for architecture and design projects.',
    author: 'Sarah & David Miller',
  },
  {
    id: 'review-2',
    quote:
      'From conceptual sketches through the final handover, Woodland brought unprecedented clarity and spatial mastery. The natural light transitions throughout the day are pure art.',
    author: 'Marcus Vance',
  },
  {
    id: 'review-3',
    quote:
      'Their dedication to enduring materials and sustainable layout planning turned our vision into our forever sanctuary. A world-class studio in every dimension.',
    author: 'Elena Rostova',
  },
]
