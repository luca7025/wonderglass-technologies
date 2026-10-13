import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
} from 'lucide-react'
import { sendChatMessage, type ChatMessage } from '../services/aiService'

interface DisplayMessage extends ChatMessage {
  id: string
  timestamp: string
}

const INITIAL_MESSAGE: DisplayMessage = {
  id: 'init-1',
  role: 'assistant',
  content: `Hello! I am Wonderglass AI, your architectural glass specialist. How can I assist you with your project, glazing specifications, or custom installations today?`,
  timestamp: 'Just now',
}

const SUGGESTIONS = [
  'What bespoke glass solutions do you offer?',
  'How do minimal frame sliding doors perform thermally?',
  'Tell me about structural glass skylights & floors.',
]

let messageCounter = 0
const createMessageId = (prefix: string) => `${prefix}-${++messageCounter}`
const getFormattedTime = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<DisplayMessage[]>([INITIAL_MESSAGE])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen, messages, isLoading])

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim()
    if (!text || isLoading) return

    const userMsg: DisplayMessage = {
      id: createMessageId('user'),
      role: 'user',
      content: text,
      timestamp: getFormattedTime(),
    }

    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const historyForApi: ChatMessage[] = nextMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const replyText = await sendChatMessage(text, historyForApi)

      const assistantMsg: DisplayMessage = {
        id: createMessageId('ai'),
        role: 'assistant',
        content: replyText,
        timestamp: getFormattedTime(),
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      const errorMsg: DisplayMessage = {
        id: createMessageId('err'),
        role: 'assistant',
        content: `Error connecting to AI Gateway: ${err.message || 'Please ensure OmniRoute is running on port 20128.'}`,
        timestamp: getFormattedTime(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `init-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chat"
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-[#111111] text-white shadow-2xl hover:bg-[#222222] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#111111]"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-sm font-medium tracking-tight">Ask Wonderglass</span>
          </>
        )}
      </motion.button>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] max-h-[640px] h-[80vh] bg-white rounded-2xl shadow-2xl border border-neutral-200/80 flex flex-col overflow-hidden text-[#111111]"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight leading-none text-white">
                    Wonderglass AI
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-neutral-400 font-normal">
                      Powered by OmniRoute
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear conversation"
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50">
              {messages.map((msg) => {
                const isUser = msg.role === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                        isUser
                          ? 'bg-neutral-900 text-white'
                          : 'bg-white border border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? 'bg-neutral-900 text-white rounded-tr-sm shadow-sm'
                            : 'bg-white text-neutral-900 border border-neutral-200/90 rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                )
              })}

              {/* Suggestions (only shown at initial state) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 space-y-1.5">
                  <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider px-1">
                    Suggested Inquiries
                  </p>
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(suggestion)}
                      className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 transition-colors shadow-2xs"
                    >
                      &rarr; {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white border border-neutral-200 text-neutral-700 flex items-center justify-center text-xs shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-neutral-200/90 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about architectural glass..."
                disabled={isLoading}
                className="flex-1 text-sm bg-neutral-100/80 border border-neutral-200/60 rounded-xl px-3.5 py-2.5 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="p-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-neutral-900 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
