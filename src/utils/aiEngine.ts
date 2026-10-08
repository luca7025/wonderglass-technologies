import type { AIModel, AppSettings } from '../types'

export async function* generateAIResponseStream(
  prompt: string,
  model: AIModel,
  settings: AppSettings,
  signal?: AbortSignal
): AsyncGenerator<string, void, unknown> {
  const lower = prompt.toLowerCase()
  let responseTemplate = ''

  if (lower.includes('zustand') || lower.includes('state') || lower.includes('react')) {
    responseTemplate = `Great architectural question! Managing state in modern React (v19+) boils down to **local state**, **server cache**, and **shared client state**.

### Comparative Breakdown:
- **Zustand**: Minimal boilerplate, unopinionated, no Context re-render cascades.
- **Signals**: Fine-grained reactivity, updates DOM nodes directly without full component tree re-evaluation.
- **React Context**: Best for low-velocity globals (Theme, Auth, Localization).

Here is a resilient **Zustand Store with TypeScript selectors**:

\`\`\`typescript
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ChatState {
  activeSessionId: string | null
  tokenUsage: number
  setActiveSession: (id: string) => void
  incrementTokens: (count: number) => void
}

export const useChatStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        activeSessionId: null,
        tokenUsage: 0,
        setActiveSession: (id) => set({ activeSessionId: id }),
        incrementTokens: (count) =>
          set((state) => ({ tokenUsage: state.tokenUsage + count })),
      }),
      { name: 'chat-storage' }
    )
  )
)
\`\`\`

### Key Recommendations:
1. Prefer atomic selectors (\`useChatStore(s => s.activeSessionId)\`) to avoid unnecessary re-renders.
2. Use TanStack Query for server state instead of cramming asynchronous API responses into client state stores.`
  } else if (lower.includes('lcp') || lower.includes('inp') || lower.includes('performance') || lower.includes('vital')) {
    responseTemplate = `Optimizing Core Web Vitals (CWV) requires tackling the primary bottlenecks in the rendering lifecycle:

### 1. Largest Contentful Paint (LCP) Targets (< 2.5s)
- **High-Priority Asset Loading**: Apply \`fetchpriority="high"\` and \`rel="preload"\` to your hero image.
- **Eliminate Render-Blocking CSS**: Inline critical CSS above the fold and defer non-critical bundles.
- **Server-Side Generation / Edge Caching**: Serve cached HTML directly from CDN edge nodes.

\`\`\`html
<!-- Preloading critical hero resource with high fetch priority -->
<link rel="preload" fetchpriority="high" as="image" href="/hero-banner.webp" type="image/webp">
\`\`\`

### 2. Interaction to Next Paint (INP) Targets (< 200ms)
- Yield to the main thread during long tasks using \`scheduler.yield()\` or chunked \`requestAnimationFrame\`.
- Avoid synchronous layout thrashing caused by reading DOM properties immediately after writes.`
  } else if (lower.includes('vector') || lower.includes('rag') || lower.includes('embedding')) {
    responseTemplate = `A Retrieval-Augmented Generation (RAG) architecture bridges static LLM training data with dynamic private enterprise context.

### The Standard Pipeline:
1. **Document Ingestion & Chunking**: Semantic recursive chunking (typically 500-1000 tokens with 10% overlap).
2. **Embedding Generation**: Convert text into high-dimensional vectors (e.g. 1536-dim or 768-dim embeddings).
3. **Vector Database Indexing**: HNSW (Hierarchical Navigable Small World) graph search with Cosine Similarity.
4. **Context Injection**: Rerank top-k documents and inject them into the system prompt.

\`\`\`python
# Vector Cosine Similarity Reference
import numpy as np

def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_product / (norm_a * norm_b)
\`\`\`

### Common Pitfalls:
- Avoid fixed-character splitting across markdown headers or code boundaries.
- Implement reciprocal rank fusion (RRF) combining hybrid BM25 lexical search with dense vector embeddings.`
  } else if (lower.includes('window') || lower.includes('algorithm') || lower.includes('debounce') || lower.includes('sliding')) {
    responseTemplate = `Here is a production-grade **Sliding Window Rate Limiter** implemented in TypeScript:

\`\`\`typescript
export class SlidingWindowRateLimiter {
  private timestamps: number[] = []

  constructor(
    private readonly windowMs: number,
    private readonly maxRequests: number
  ) {}

  public allowRequest(now: number = Date.now()): boolean {
    const windowStart = now - this.windowMs

    // Evict expired timestamps outside the sliding window
    while (this.timestamps.length > 0 && this.timestamps[0] <= windowStart) {
      this.timestamps.shift()
    }

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now)
      return true
    }

    return false
  }

  public getRemainingTokens(now: number = Date.now()): number {
    const windowStart = now - this.windowMs
    const active = this.timestamps.filter((t) => t > windowStart).length
    return Math.max(0, this.maxRequests - active)
  }
}
\`\`\`

### Time and Space Complexity:
- **Amortized Time**: \`O(1)\` per request.
- **Space Complexity**: \`O(K)\` where \`K\` is the maximum allowed requests in the window.`
  } else {
    responseTemplate = `Thank you for your prompt: *"{{PROMPT}}"*

Analyzing through **{{MODEL_NAME}}** (Engine: {{PROVIDER}})...

### Synthesis & Key Points:
1. **Clear Objectives**: Understanding core requirements, dependencies, and constraints.
2. **Modular Architecture**: Decomposing problem spaces into maintainable, testable components.
3. **Robust Implementation**: Ensuring error boundaries, accessibility, and resilient UX states.

\`\`\`typescript
// Solution blueprint powered by ${model.name}
export async function executeNeuralTask(context: Record<string, unknown>) {
  console.log("Processing pipeline with model: ${model.name}");
  return {
    status: "success",
    timestamp: Date.now(),
    payload: context,
  };
}
\`\`\`

Let me know if you would like me to unpack this further or provide targeted code examples!`
  }

  const renderedText = responseTemplate
    .replace('{{PROMPT}}', prompt.replace(/"/g, ''))
    .replace('{{MODEL_NAME}}', model.name)
    .replace('{{PROVIDER}}', model.provider)

  // Stream token by token (or chunk by chunk)
  const tokens = renderedText.split(' ')
  for (let i = 0; i < tokens.length; i++) {
    if (signal?.aborted) {
      break
    }
    const token = tokens[i] + (i < tokens.length - 1 ? ' ' : '')
    yield token
    await new Promise((res) => setTimeout(res, settings.streamSpeedMs || 35))
  }
}
