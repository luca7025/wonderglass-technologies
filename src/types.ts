export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  model?: string
  attachment?: {
    name: string
    size: string
    type: string
  }
  feedback?: 'like' | 'dislike'
  tokensCount?: number
}

export interface Conversation {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  modelId: string
  personaId: string
  messages: Message[]
}

export interface AIModel {
  id: string
  name: string
  badge: string
  description: string
  category: 'ultra' | 'flash' | 'reasoning'
  provider: string
}

export interface Persona {
  id: string
  name: string
  description: string
  systemPrompt: string
  temperature: number
}

export interface AppSettings {
  theme: 'dark' | 'light'
  soundEffects: boolean
  streamSpeedMs: number
  systemInstruction: string
  temperature: number
}
