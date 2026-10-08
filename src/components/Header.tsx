import React from 'react'
import {
  Menu,
  Sun,
  Moon,
  Settings as SettingsIcon,
  Download,
  Trash2,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import type { AppSettings } from '../types'
import { AI_MODELS } from '../data/initialData'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void
  currentModelId: string
  onSelectModel: (modelId: string) => void
  settings: AppSettings
  onToggleTheme: () => void
  onOpenSettings: () => void
  onClearChat: () => void
  onExportChat: () => void
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentModelId,
  onSelectModel,
  settings,
  onToggleTheme,
  onOpenSettings,
  onClearChat,
  onExportChat
}) => {
  const currentModel = AI_MODELS.find((m) => m.id === currentModelId) || AI_MODELS[0]
  const [modelDropdownOpen, setModelDropdownOpen] = React.useState(false)

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="icon-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Open sidebar'}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Model Selector Dropdown */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            className="model-selector-pill"
            onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
            aria-expanded={modelDropdownOpen}
          >
            <Sparkles size={16} color="var(--accent-primary)" />
            <span>{currentModel.name}</span>
            <span className="model-badge-tag">{currentModel.badge}</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {modelDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '280px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-floating)',
                padding: '6px',
                zIndex: 50,
                animation: 'fadeInSlideUp 0.15s ease'
              }}
            >
              <div
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  padding: '6px 10px'
                }}
              >
                Select AI Engine
              </div>
              {AI_MODELS.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onSelectModel(model.id)
                    setModelDropdownOpen(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    textAlign: 'left',
                    background:
                      model.id === currentModelId
                        ? 'var(--bg-surface-elevated)'
                        : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (model.id !== currentModelId) {
                      e.currentTarget.style.background = 'var(--bg-surface-hover)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (model.id !== currentModelId) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color:
                          model.id === currentModelId
                            ? 'var(--accent-primary)'
                            : 'var(--text-main)'
                      }}
                    >
                      {model.name}
                    </span>
                    <span className="model-badge-tag">{model.badge}</span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.3
                    }}
                  >
                    {model.description}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Export Chat */}
        <button
          className="icon-btn"
          onClick={onExportChat}
          title="Export conversation (Markdown)"
          aria-label="Export conversation"
        >
          <Download size={18} />
        </button>

        {/* Clear Chat */}
        <button
          className="icon-btn"
          onClick={onClearChat}
          title="Clear current messages"
          aria-label="Clear current messages"
        >
          <Trash2 size={18} />
        </button>

        {/* Theme Toggle */}
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          title={
            settings.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
          }
          aria-label="Toggle theme"
        >
          {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Settings Button */}
        <button
          className="icon-btn"
          onClick={onOpenSettings}
          title="Workspace Settings"
          aria-label="Workspace Settings"
        >
          <SettingsIcon size={18} />
        </button>
      </div>
    </header>
  )
}
