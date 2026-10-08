import React, { useState } from 'react'
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Sparkles
} from 'lucide-react'
import type { Message } from '../types'

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
  onRegenerate?: () => void
  onFeedback?: (messageId: string, type: 'like' | 'dislike') => void
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
  onRegenerate,
  onFeedback
}) => {
  const isUser = message.role === 'user'
  const [copiedMsg, setCopiedMsg] = useState(false)
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null)

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content)
    setCopiedMsg(true)
    setTimeout(() => setCopiedMsg(false), 2000)
  }

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCodeIndex(index)
    setTimeout(() => setCopiedCodeIndex(null), 2000)
  }

  const formatTimestamp = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Custom lightweight parser for code blocks and basic markdown
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n')
        const firstLine = lines[0].trim()
        const isLang = /^[a-zA-Z0-9_-]+$/.test(firstLine)
        const language = isLang ? firstLine : 'code'
        const codeText = isLang ? lines.slice(1).join('\n') : lines.join('\n')

        return (
          <div key={index} className="code-block-wrapper">
            <div className="code-header">
              <span className="code-language">{language}</span>
              <button
                className="copy-code-btn"
                onClick={() => handleCopyCode(codeText, index)}
                aria-label="Copy code block"
              >
                {copiedCodeIndex === index ? (
                  <>
                    <Check size={14} color="#10b981" />
                    <span style={{ color: '#10b981' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="code-pre">
              <code>{codeText}</code>
            </pre>
          </div>
        )
      }

      // Format headers, bold, lists, and inline code in paragraphs
      const paragraphs = part.split('\n\n')
      return (
        <div key={index}>
          {paragraphs.map((para, pIdx) => {
            if (!para.trim()) return null

            // Heading 3
            if (para.startsWith('### ')) {
              return (
                <h3 key={pIdx}>
                  {formatInlineText(para.replace(/^###\s+/, ''))}
                </h3>
              )
            }
            // Heading 2
            if (para.startsWith('## ')) {
              return (
                <h2 key={pIdx} style={{ fontSize: '1.25rem', margin: '1em 0 0.4em' }}>
                  {formatInlineText(para.replace(/^##\s+/, ''))}
                </h2>
              )
            }
            // Bullet list
            if (para.split('\n').every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '))) {
              const items = para.split('\n').filter((l) => l.trim())
              return (
                <ul key={pIdx}>
                  {items.map((item, iIdx) => (
                    <li key={iIdx}>
                      {formatInlineText(item.replace(/^[-*]\s+/, ''))}
                    </li>
                  ))}
                </ul>
              )
            }

            return (
              <p key={pIdx}>
                {formatInlineText(para)}
                {isStreaming && index === parts.length - 1 && pIdx === paragraphs.length - 1 && (
                  <span className="streaming-cursor" />
                )}
              </p>
            )
          })}
        </div>
      )
    })
  }

  // Inline formatting for bold, inline code, and links
  const formatInlineText = (text: string): React.ReactNode => {
    const inlineTokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
    return inlineTokens.map((token, idx) => {
      if (token.startsWith('`') && token.endsWith('`')) {
        return <code key={idx}>{token.slice(1, -1)}</code>
      }
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={idx}>{token.slice(2, -2)}</strong>
      }
      return token
    })
  }

  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'} animate-message`}>
      <img
        src={isUser ? '/user-avatar.jpg' : '/bot-avatar.jpg'}
        alt={isUser ? 'User Avatar' : 'Aethra AI Avatar'}
        className="message-avatar"
      />

      <div className="message-bubble">
        <div className="message-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className="message-author">
              {isUser ? 'You' : 'Aethra AI'}
            </span>
            {!isUser && message.model && (
              <span className="message-model-tag">{message.model}</span>
            )}
          </div>
          <span>{formatTimestamp(message.timestamp)}</span>
        </div>

        {/* Attachment badge */}
        {message.attachment && (
          <div className="message-attachment">
            <Paperclip size={14} />
            <span>{message.attachment.name}</span>
            <span style={{ color: 'var(--text-muted)' }}>
              ({message.attachment.size})
            </span>
          </div>
        )}

        <div className="markdown-body">
          {renderFormattedContent(message.content)}
        </div>

        {/* Assistant action buttons */}
        {!isUser && !isStreaming && (
          <div className="message-actions">
            <button
              className="action-chip-btn"
              onClick={handleCopyMessage}
              title="Copy response"
            >
              {copiedMsg ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
              <span>{copiedMsg ? 'Copied' : 'Copy'}</span>
            </button>

            {onRegenerate && (
              <button
                className="action-chip-btn"
                onClick={onRegenerate}
                title="Regenerate this response"
              >
                <RotateCcw size={13} />
                <span>Regenerate</span>
              </button>
            )}

            <button
              className={`action-chip-btn ${message.feedback === 'like' ? 'active' : ''}`}
              onClick={() => onFeedback && onFeedback(message.id, 'like')}
              title="Good response"
            >
              <ThumbsUp size={13} />
            </button>

            <button
              className={`action-chip-btn ${message.feedback === 'dislike' ? 'active' : ''}`}
              onClick={() => onFeedback && onFeedback(message.id, 'dislike')}
              title="Poor response"
            >
              <ThumbsDown size={13} />
            </button>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <Sparkles size={11} color="var(--accent-primary)" />
              <span>Verified Output</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
