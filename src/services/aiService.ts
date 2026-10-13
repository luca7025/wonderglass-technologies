import type { ChatMessage } from '../types'
export type { ChatMessage }

const BASE_URL = import.meta.env.VITE_AI_BASE_URL || 'http://localhost:20128/v1'
const API_KEY = import.meta.env.VITE_AI_API_KEY || ''
const DEFAULT_MODEL = import.meta.env.VITE_AI_MODEL || 'ddgw/mistral-small-2603'

const SYSTEM_PROMPT: ChatMessage = {
  role: 'system',
  content: `You are Wonderglass AI, an architectural design and bespoke glass specialist assistant for Wonderglass. 
You speak in a refined, helpful, and concise manner. 
You assist architects, builders, and luxury homeowners with inquiries about high-end architectural glass, minimalist sliding doors, glass façades, skylights, acoustic glazing, and custom structural glass solutions.
Keep answers articulate, practical, and under 3-4 short paragraphs unless the user requests in-depth technical specifications.`,
}

export async function sendChatMessage(
  userPrompt: string,
  history: ChatMessage[] = [],
  model = DEFAULT_MODEL
): Promise<string> {
  const messages: ChatMessage[] = [
    SYSTEM_PROMPT,
    ...history.filter((m) => m.role !== 'system'),
    { role: 'user', content: userPrompt },
  ]

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => null)
      const errorMsg = errData?.error?.message || `HTTP ${response.status}: ${response.statusText}`
      throw new Error(errorMsg)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content
    if (!reply) {
      throw new Error('No content returned from AI provider.')
    }

    return reply
  } catch (error: any) {
    console.error('[OmniRoute AI Error]:', error)
    throw error
  }
}
