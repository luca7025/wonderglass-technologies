import React, { useState } from 'react'
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  Bot
} from 'lucide-react'
import type { Conversation } from '../types'

interface SidebarProps {
  isOpen: boolean
  conversations: Conversation[]
  activeConvId: string
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string, e: React.MouseEvent) => void
  onOpenSettings: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  conversations,
  activeConvId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onOpenSettings
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="brand-badge">
          <img
            src="/bot-avatar.jpg"
            alt="Aethra AI Logo"
            className="brand-logo-img"
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="brand-title">Aethra AI</span>
              <span className="brand-version">v2.5</span>
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em'
              }}
            >
              Neural Workspace
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-actions">
        <button
          className="new-chat-btn"
          onClick={onNewConversation}
          aria-label="Start new chat"
        >
          <Plus size={18} />
          <span>New Chat</span>
        </button>

        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="sidebar-content">
        <div className="section-label">Recent Chats ({filteredConversations.length})</div>

        {filteredConversations.length === 0 ? (
          <div
            style={{
              padding: '24px 12px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.82rem'
            }}
          >
            {searchQuery ? 'No matching conversations' : 'No chats yet'}
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = conv.id === activeConvId
            return (
              <button
                key={conv.id}
                className={`conv-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div className="conv-info">
                  <MessageSquare
                    size={16}
                    color={isActive ? 'var(--accent-primary)' : 'var(--text-muted)'}
                    style={{ flexShrink: 0 }}
                  />
                  <span className="conv-title" title={conv.title}>
                    {conv.title}
                  </span>
                </div>

                <div
                  className="conv-delete-btn"
                  onClick={(e) => onDeleteConversation(conv.id, e)}
                  title="Delete chat"
                  role="button"
                  tabIndex={0}
                >
                  <Trash2 size={14} />
                </div>
              </button>
            )
          })
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-badge" onClick={onOpenSettings} style={{ cursor: 'pointer' }}>
          <img
            src="/user-avatar.jpg"
            alt="User Avatar"
            className="user-avatar-img"
          />
          <div>
            <div className="user-name">Developer</div>
            <div className="user-plan">Pro Tier • Local Mode</div>
          </div>
        </div>

        <button
          className="icon-btn"
          onClick={onOpenSettings}
          title="Engine Status"
          aria-label="Engine status"
        >
          <Bot size={18} color="var(--accent-cyan)" />
        </button>
      </div>
    </aside>
  )
}
