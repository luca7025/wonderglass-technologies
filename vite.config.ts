import { defineConfig, loadEnv, type Plugin, type ViteDevServer, type PreviewServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Runs netlify/functions/chat.mjs under `npm run dev` / `preview`, so the chatbot
// works locally without the Netlify CLI. On Netlify the real function is used.
function netlifyChatFunction(): Plugin {
  const mount = (server: ViteDevServer | PreviewServer, load: () => Promise<Record<string, any>>) => {
    server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const { default: handler } = await load()
      const response: Response = await handler(
        new Request('http://localhost/.netlify/functions/chat', {
          method: req.method,
          headers: { 'Content-Type': 'application/json' },
          body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
        })
      )
      res.statusCode = response.status
      res.setHeader('Content-Type', 'application/json')
      res.end(await response.text())
    })
  }
  return {
    name: 'netlify-chat-function',
    configureServer: (server) => mount(server, () => server.ssrLoadModule('/netlify/functions/chat.mjs')),
    configurePreviewServer: (server) => mount(server, () => import(`${process.cwd()}/netlify/functions/chat.mjs`)),
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Expose AI_* from .env to the function (server-side only, never bundled).
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'AI_'))

  return {
    plugins: [react(), tailwindcss(), netlifyChatFunction()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react'
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion'
            }
            if (id.includes('node_modules/lenis')) {
              return 'vendor-lenis'
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons'
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  }
})
