import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import type { Conversation, Message, AppSettings } from './types'
import {
  INITIAL_CONVERSATION,
  AI_MODELS
} from './data/initialData'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ChatMessage } from './components/ChatMessage'
import { ChatInput } from './components/ChatInput'
import { QuickPrompts } from './components/QuickPrompts'
import { SettingsModal } from './components/SettingsModal'
import { generateAIResponseStream } from './utils/aiEngine'

const LOCAL_STORAGE_CONVS_KEY = 'aethra_conversations_v1'
const LOCAL_STORAGE_ACTIVE_KEY = 'aethra_active_conv_id_v1'
const LOCAL_STORAGE_SETTINGS_KEY = 'aethra_settings_v1'

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  soundEffects: false,
  streamSpeedMs: 30,
  systemInstruction: 'You are an elite AI engineer delivering concise, production-ready code.',
  temperature: 0.7
}

export function App() {
  // Load saved settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return DEFAULT_SETTINGS
  })

  // Load saved conversations
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_CONVS_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      } catch {
        // fallback
      }
    }
    return [INITIAL_CONVERSATION]
  })

  // Load active conversation ID
  const [activeConvId, setActiveConvId] = useState<string>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_KEY)
    if (saved && conversations.some((c) => c.id === saved)) {
      return saved
    }
    return conversations[0]?.id || INITIAL_CONVERSATION.id
  })

  // Sidebar toggle state
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)
  const chatScrollEndRef = useRef<HTMLDivElement>(null)

  // Current active conversation
  const currentConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0]

  // Persist conversations
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONVS_KEY, JSON.stringify(conversations))
  }, [conversations])

  // Persist active conv ID
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_KEY, activeConvId)
  }, [activeConvId])

  // Persist settings & sync theme to HTML root
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(settings))
    document.documentElement.setAttribute('data-theme', settings.theme)
  }, [settings])

  // Scroll to bottom on messages change
  const scrollToBottom = () => {
    chatScrollEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentConversation?.messages.length, isStreaming])

  // Theme toggle
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }))
  }

  // Create new conversation
  const handleNewConversation = () => {
    if (isStreaming) {
      abortControllerRef.current?.abort()
      setIsStreaming(false)
    }

    const newId = `conv-${Date.now()}`
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      modelId: currentConversation?.modelId || 'gemini-2.5-flash',
      personaId: 'fullstack-lead',
      messages: []
    }

    setConversations((prev) => [newConv, ...prev])
    setActiveConvId(newId)
  }

  // Delete conversation
  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const remaining = conversations.filter((c) => c.id !== id)
    if (remaining.length === 0) {
      const freshConv: Conversation = {
        id: `conv-${Date.now()}`,
        title: 'New Conversation',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        modelId: 'gemini-2.5-flash',
        personaId: 'fullstack-lead',
        messages: []
      }
      setConversations([freshConv])
      setActiveConvId(freshConv.id)
    } else {
      setConversations(remaining)
      if (activeConvId === id) {
        setActiveConvId(remaining[0].id)
      }
    }
  }

  // Clear current chat
  const handleClearChat = () => {
    if (isStreaming) {
      abortControllerRef.current?.abort()
      setIsStreaming(false)
    }

    setConversations((prev) =>
      prev.map((c) => (c.id === activeConvId ? { ...c, messages: [] } : c))
    )
  }

  // Export current chat as Markdown file
  const handleExportChat = () => {
    if (!currentConversation || currentConversation.messages.length === 0) return

    let md = `# ${currentConversation.title}\n`
    md += `*Exported from Aethra AI on ${new Date().toLocaleString()}*\n\n---\n\n`

    currentConversation.messages.forEach((msg) => {
      const author = msg.role === 'user' ? '👤 User' : `🤖 Aethra (${msg.model || 'AI'})`
      md += `### ${author} [${new Date(msg.timestamp).toLocaleTimeString()}]\n\n`
      if (msg.attachment) {
        md += `*Attached: ${msg.attachment.name} (${msg.attachment.size})*\n\n`
      }
      md += `${msg.content}\n\n---\n\n`
    })

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${currentConversation.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Change AI model
  const handleSelectModel = (modelId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConvId ? { ...c, modelId } : c))
    )
  }

  // Send message and stream AI response
  const handleSendMessage = async (
    text: string,
    attachment?: { name: string; size: string; type: string }
  ) => {
    if (!text && !attachment) return

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      attachment
    }

    const currentModel =
      AI_MODELS.find((m) => m.id === currentConversation.modelId) || AI_MODELS[0]

    // Generate smart conversation title if first message
    const isFirstMessage = currentConversation.messages.length === 0
    const newTitle = isFirstMessage
      ? text.slice(0, 32) + (text.length > 32 ? '...' : '')
      : currentConversation.title

    // Assistant message placeholder
    const assistantMessageId = `msg-ai-${Date.now()}`
    const assistantPlaceholder: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      model: currentModel.name
    }

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            title: newTitle,
            updatedAt: Date.now(),
            messages: [...c.messages, userMessage, assistantPlaceholder]
          }
        }
        return c
      })
    )

    // Start streaming
    setIsStreaming(true)
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    let accumulatedContent = ''

    try {
      const stream = generateAIResponseStream(
        text,
        currentModel,
        settings,
        abortController.signal
      )

      for await (const chunk of stream) {
        accumulatedContent += chunk

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === activeConvId) {
              const updatedMessages = c.messages.map((m) => {
                if (m.id === assistantMessageId) {
                  return { ...m, content: accumulatedContent }
                }
                return m
              })
              return { ...c, messages: updatedMessages }
            }
            return c
          })
        )
      }
    } catch {
      // Stream stopped or failed
    } finally {
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }

  // Stop active streaming
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsStreaming(false)
    }
  }

  // Regenerate last assistant response
  const handleRegenerate = () => {
    if (isStreaming || currentConversation.messages.length < 2) return

    // Find the last user message
    const lastUserMessage = [...currentConversation.messages]
      .reverse()
      .find((m) => m.role === 'user')

    if (lastUserMessage) {
      // Remove last assistant message
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            const filtered = c.messages.filter((m) => m.role !== 'assistant' || m.id !== c.messages[c.messages.length - 1].id)
            return { ...c, messages: filtered }
          }
          return c
        })
      )
      handleSendMessage(lastUserMessage.content, lastUserMessage.attachment)
    }
  }

  // Feedback on message
  const handleFeedback = (messageId: string, feedback: 'like' | 'dislike') => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          const updated = c.messages.map((m) => {
            if (m.id === messageId) {
              return { ...m, feedback: m.feedback === feedback ? undefined : feedback }
            }
            return m
          })
          return { ...c, messages: updated }
        }
        return c
      })
    )
  }

  return (
    <div className="app-container">
      {/* Dynamic Background Atmosphere Orbs */}
      <div className="bg-glow-orbs">
        <div className="bg-orb-1" />
        <div className="bg-orb-2" />
      </div>

      {/* Collapsible Workspace Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        conversations={conversations}
        activeConvId={activeConvId}
        onSelectConversation={setActiveConvId}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Chat Interface */}
      <main className="main-wrapper">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentModelId={currentConversation?.modelId || 'gemini-2.5-flash'}
          onSelectModel={handleSelectModel}
          settings={settings}
          onToggleTheme={toggleTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onClearChat={handleClearChat}
          onExportChat={handleExportChat}
        />

        <div className="chat-scroll-area">
          <div className="chat-inner-width">
            {currentConversation && currentConversation.messages.length === 0 ? (
              <div className="empty-state">
                <img
                  src="/bot-avatar.jpg"
                  alt="Aethra AI Core"
                  className="empty-state-avatar animate-pulse-glow"
                />
                <h1 className="empty-title">How can Aethra assist you today?</h1>
                <p className="empty-subtitle">
                  Select a starter suggestion below or ask any architectural, coding, or algorithmic question.
                </p>

                <QuickPrompts
                  onSelectPrompt={(title, desc) =>
                    handleSendMessage(`${title}: ${desc}`)
                  }
                />
              </div>
            ) : (
              currentConversation?.messages.map((msg, index) => {
                const isLast = index === currentConversation.messages.length - 1
                return (
                  <ChatMessage
                    key={msg.id}
                    message={msg}
                    isStreaming={isStreaming && isLast && msg.role === 'assistant'}
                    onRegenerate={isLast && msg.role === 'assistant' ? handleRegenerate : undefined}
                    onFeedback={handleFeedback}
                  />
                )
              })
            )}
            <div ref={chatScrollEndRef} style={{ height: '8px' }} />
          </div>
        </div>

        {/* Floating Input Capsule */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          onStopStreaming={handleStopStreaming}
        />
      </main>

      {/* Settings Configuration Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={setSettings}
      />
    </div>
  )
}

export default App
