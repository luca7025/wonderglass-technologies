import type { ChatMessage } from '../types'
export type { ChatMessage }

// Calls our Netlify Function (netlify/functions/chat.mjs), which holds the API key.
export async function sendChatMessage(history: ChatMessage[]): Promise<string> {
  const response = await fetch('/.netlify/functions/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history.filter((m) => m.role !== 'system') }),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok || !data?.reply) {
    throw new Error(data?.error || `HTTP ${response.status}: ${response.statusText}`)
  }
  return data.reply
}
