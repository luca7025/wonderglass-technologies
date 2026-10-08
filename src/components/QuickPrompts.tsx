import React from 'react'
import {
  Layers,
  Zap,
  Brain,
  Code,
  ArrowUpRight
} from 'lucide-react'
import { QUICK_PROMPTS } from '../data/initialData'

interface QuickPromptsProps {
  onSelectPrompt: (title: string, desc: string) => void
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onSelectPrompt }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers size={18} color="var(--accent-primary)" />
      case 'Zap':
        return <Zap size={18} color="var(--accent-cyan)" />
      case 'Brain':
        return <Brain size={18} color="#ec4899" />
      case 'Code':
        return <Code size={18} color="#10b981" />
      default:
        return <ArrowUpRight size={18} />
    }
  }

  return (
    <div className="quick-prompts-grid">
      {QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt.id}
          className="prompt-card"
          onClick={() => onSelectPrompt(prompt.title, prompt.desc)}
        >
          <div className="prompt-card-top">
            <span className="prompt-category">{prompt.category}</span>
            {getIcon(prompt.icon)}
          </div>
          <div className="prompt-title">{prompt.title}</div>
          <div className="prompt-desc">{prompt.desc}</div>
        </button>
      ))}
    </div>
  )
}
