import React, { useState, useRef, useEffect } from 'react'
import {
  ArrowUp,
  Square,
  Paperclip,
  Mic,
  MicOff,
  X
} from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (text: string, attachment?: { name: string; size: string; type: string }) => void
  isStreaming: boolean
  onStopStreaming: () => void
  placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isStreaming,
  onStopStreaming,
  placeholder = 'Ask Aethra anything... (Enter to send, Shift+Enter for new line)'
}) => {
  const [input, setInput] = useState('')
  const [attachment, setAttachment] = useState<{ name: string; size: string; type: string } | null>(null)
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Adjust textarea height on input change if field-sizing is not supported
  useEffect(() => {
    if (textareaRef.current && !CSS.supports('field-sizing', 'content')) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    if ((!input.trim() && !attachment) || isStreaming) return
    onSendMessage(input.trim(), attachment || undefined)
    setInput('')
    setAttachment(null)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1)
      setAttachment({
        name: file.name,
        size: `${sizeKB} KB`,
        type: file.type || 'text/plain'
      })
    }
    // reset input
    e.target.value = ''
  }

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      // Simulate speech-to-text recognition
      setTimeout(() => {
        setInput((prev) => (prev ? prev + ' ' : '') + 'How do I optimize React 19 server actions?')
        setIsListening(false)
      }, 2000)
    }
  }

  return (
    <div className="input-section-container">
      <div className="input-capsule-box">
        {/* Attachment preview pill */}
        {attachment && (
          <div className="attachment-badge-row">
            <div className="attachment-pill">
              <Paperclip size={13} color="var(--accent-primary)" />
              <span>{attachment.name}</span>
              <span style={{ color: 'var(--text-muted)' }}>({attachment.size})</span>
              <button
                className="attachment-remove-btn"
                onClick={() => setAttachment(null)}
                title="Remove attachment"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )}

        <div className="input-row">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder={isListening ? 'Listening to voice input...' : placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />

          <div className="input-buttons-row">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {/* Attach button */}
            <button
              type="button"
              className="icon-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach document or code snippet"
              aria-label="Attach file"
            >
              <Paperclip size={18} />
            </button>

            {/* Mic / Voice button */}
            <button
              type="button"
              className="icon-btn"
              onClick={toggleVoice}
              title={isListening ? 'Listening...' : 'Dictate with voice'}
              aria-label="Voice input"
              style={isListening ? { color: 'var(--accent-pink)' } : {}}
            >
              {isListening ? (
                <MicOff size={18} className="animate-pulse-glow" />
              ) : (
                <Mic size={18} />
              )}
            </button>

            {/* Send or Stop button */}
            {isStreaming ? (
              <button
                type="button"
                className="stop-btn"
                onClick={onStopStreaming}
                title="Stop response generation"
                aria-label="Stop generation"
              >
                <Square size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="send-btn"
                onClick={handleSubmit}
                disabled={!input.trim() && !attachment}
                title="Send message (Enter)"
                aria-label="Send message"
              >
                <ArrowUp size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="input-disclaimer">
        Aethra AI can generate code and architecture suggestions. Always test in development environments.
      </div>
    </div>
  )
}
