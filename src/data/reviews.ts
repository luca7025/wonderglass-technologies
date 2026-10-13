export interface ReviewItem {
  id: string
  quote: string
  author?: string
}

export const reviewsData: ReviewItem[] = [
  {
    id: 'review-1',
    quote:
      'Working with WonderGlass was a game-changer for our Palm Jumeirah villa. The switchable smart glass gives us instant privacy with effortless modern style, and the motorized blinds protect us perfectly from the afternoon sun. Truly exceptional engineering.',
    author: 'Tariq Al-Mansouri • Palm Jumeirah Resident',
  },
  {
    id: 'review-2',
    quote:
      'From initial technical consultation through project commissioning at our Abu Dhabi corporate offices, WonderGlass delivered world-class precision. The Vertilux guillotine system operates with whisper-quiet smoothness.',
    author: 'Eng. Kareem Haddad • Project Director, Abu Dhabi',
  },
  {
    id: 'review-3',
    quote:
      'Their 5-year guarantee and dedicated UAE technical support gave our design studio total confidence. The retractable glass solarium allows our clients to enjoy outdoor living in the UAE year-round.',
    author: 'Sophia Sterling • Principal Architect, Dubai',
  },
]
