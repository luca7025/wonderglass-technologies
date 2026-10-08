import type { AIModel, Conversation, Persona } from '../types'

export const AI_MODELS: AIModel[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    badge: 'Fastest',
    description: 'Sub-second response, high throughput & multimodal understanding',
    category: 'flash',
    provider: 'Google AI'
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    badge: 'Flagship',
    description: 'Advanced reasoning, million-token context & complex coding',
    category: 'reasoning',
    provider: 'Google AI'
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    badge: 'Hybrid Thinker',
    description: 'Hybrid reasoning and high fidelity code generation',
    category: 'reasoning',
    provider: 'Anthropic'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Omni',
    badge: 'Versatile',
    description: 'Multimodal intelligence, rapid conversational reasoning',
    category: 'ultra',
    provider: 'OpenAI'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    badge: 'Math & Logic',
    description: 'Specialized in algorithmic verification and step-by-step thinking',
    category: 'reasoning',
    provider: 'DeepSeek'
  }
]

export const PERSONAS: Persona[] = [
  {
    id: 'fullstack-lead',
    name: 'Senior Architect',
    description: 'High-scale systems, modern TypeScript, resilient patterns',
    systemPrompt: 'You are a Principal Full-Stack Software Architect. Deliver pragmatic, clean, and production-tested patterns.',
    temperature: 0.3
  },
  {
    id: 'creative-innovator',
    name: 'Product Innovator',
    description: 'Creative solutions, product discovery, UX enhancement',
    systemPrompt: 'You are an inventive product strategist and creative UX innovator with sharp design sensibilities.',
    temperature: 0.7
  },
  {
    id: 'speed-coder',
    name: 'Concise Engineer',
    description: 'Direct code, minimal commentary, instant answers',
    systemPrompt: 'Provide direct, minimal, and correct code solutions without unnecessary preamble.',
    temperature: 0.2
  }
]

export const QUICK_PROMPTS = [
  {
    id: 'p1',
    title: 'Modern State Management',
    desc: 'Compare Zustand vs Signals vs React Context with code examples',
    category: 'Architecture',
    icon: 'Layers'
  },
  {
    id: 'p2',
    title: 'Optimizing LCP & INP',
    desc: 'Audit Core Web Vitals and generate a prioritized optimization checklist',
    category: 'Performance',
    icon: 'Zap'
  },
  {
    id: 'p3',
    title: 'Vector Search & RAG Flow',
    desc: 'Explain chunking strategies and embedding distance metrics in plain terms',
    category: 'AI / ML',
    icon: 'Brain'
  },
  {
    id: 'p4',
    title: 'TypeScript Sliding Window',
    desc: 'Implement a token bucket or sliding window algorithm with generics',
    category: 'Algorithms',
    icon: 'Code'
  }
]

export const INITIAL_CONVERSATION: Conversation = {
  id: 'conv-welcome-01',
  title: 'Welcome to Aethra AI',
  createdAt: Date.now() - 1000 * 60 * 15,
  updatedAt: Date.now() - 1000 * 60 * 15,
  modelId: 'gemini-2.5-pro',
  personaId: 'fullstack-lead',
  messages: [
    {
      id: 'msg-1',
      role: 'assistant',
      timestamp: Date.now() - 1000 * 60 * 15,
      model: 'Gemini 2.5 Pro',
      content: `Hello! I am **Aethra AI**, your intelligent neural assistant workspace.

I'm configured with high-performance model simulation, streaming responses, multi-conversation management, and syntax-highlighted code rendering.

### Quick Start Capabilities:
- **Streaming Generation**: Real-time simulated token output with instant cancelation.
- **Model Switching**: Toggle between Gemini, Claude, GPT, and reasoning engines.
- **Multi-session Storage**: Your conversations persist safely in browser storage.
- **Rich Markdown Formatting**: Code blocks, copy-to-clipboard, alerts, and tables.

Here is a quick TypeScript example demonstrating modern async streaming:

\`\`\`typescript
interface StreamEvent<T> {
  chunk: T
  done: boolean
  latencyMs: number
}

async function* streamTokens(prompt: string): AsyncGenerator<string, void, unknown> {
  const words = prompt.split(" ")
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 45))
    yield word + " "
  }
}
\`\`\`

Feel free to try asking a question below, or select any of the prompt templates to test my capabilities!`
    }
  ]
}
