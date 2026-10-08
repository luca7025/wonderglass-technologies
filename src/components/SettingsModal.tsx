import React, { useState } from 'react'
import { X, Sliders, Volume2, Key, Sparkles } from 'lucide-react'
import type { AppSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: AppSettings
  onSaveSettings: (settings: AppSettings) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings)

  if (!isOpen) return null

  const handleSave = () => {
    onSaveSettings(formData)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="var(--accent-primary)" />
            <h2 className="modal-title">Workspace Configuration</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* System Persona / Instructions */}
          <div className="setting-row">
            <label className="setting-label">
              <span>System Persona Prompt</span>
              <span className="setting-subtext">Directs AI tone & methodology</span>
            </label>
            <textarea
              className="setting-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
              value={formData.systemInstruction}
              onChange={(e) =>
                setFormData({ ...formData, systemInstruction: e.target.value })
              }
              placeholder="e.g. You are an expert AI software architect..."
            />
          </div>

          {/* Temperature Slider */}
          <div className="setting-row">
            <div className="setting-label">
              <span>Creativity (Temperature)</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                {formData.temperature.toFixed(2)}
              </span>
            </div>
            <div className="setting-subtext">
              Lower values are more precise & deterministic; higher values are creative.
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={formData.temperature}
              onChange={(e) =>
                setFormData({ ...formData, temperature: parseFloat(e.target.value) })
              }
              style={{ accentColor: 'var(--accent-primary)', width: '100%' }}
            />
          </div>

          {/* Stream Output Speed */}
          <div className="setting-row">
            <label className="setting-label">
              <span>Streaming Generation Speed</span>
            </label>
            <select
              className="setting-select"
              value={formData.streamSpeedMs}
              onChange={(e) =>
                setFormData({ ...formData, streamSpeedMs: parseInt(e.target.value, 10) })
              }
            >
              <option value={15}>Instant Flash (15ms / token)</option>
              <option value={35}>Natural Stream (35ms / token)</option>
              <option value={70}>Deliberate Reasoning (70ms / token)</option>
            </select>
          </div>

          {/* Sound Effects toggle */}
          <div className="setting-row">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={16} color="var(--accent-cyan)" />
                <span className="setting-label">Interface Audio Feedback</span>
              </div>
              <input
                type="checkbox"
                checked={formData.soundEffects}
                onChange={(e) =>
                  setFormData({ ...formData, soundEffects: e.target.checked })
                }
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>

          {/* API Mode indicator */}
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Key size={18} color="var(--accent-primary)" />
            <div style={{ flex: 1, fontSize: '0.8rem' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                Zero Configuration Required
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                Offline neural simulation active with instant token responses.
              </div>
            </div>
            <Sparkles size={16} color="#10b981" />
          </div>
        </div>

        <div className="modal-footer">
          <button className="secondary-modal-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-modal-btn" onClick={handleSave}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  )
}
