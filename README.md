# Aethra AI • Neural Chatbot Workspace

A high-performance, modern AI chatbot application built with **React 19**, **TypeScript**, **Vite**, and vanilla CSS design system with glassmorphism aesthetics.

---

## 🌟 Key Features

- **⚡ Real-Time Streaming Generation**: Simulated token-by-token output with cancel/stop generation capabilities.
- **🧠 Multi-Model Switcher**: Toggle between Gemini 2.5 Flash, Gemini 2.5 Pro, Claude 3.7 Sonnet, GPT-4o, and DeepSeek R1.
- **🎨 Glassmorphic Dark / Light Mode**: Sleek obsidian background with neon glows, fluid typography, and seamless theme switching.
- **💾 Local Multi-Conversation Storage**: Auto-persists your chat sessions, titles, and preferences to `localStorage`.
- **💻 Formatted Markdown & Code Rendering**:
  - Syntax highlighted code blocks with one-click **Copy code** button
  - Bold, lists, headings, and inline tags
  - Message feedback (Like, Dislike, Regenerate, Copy message)
- **📎 Multi-modal Attachment Preview**: Attach code files or documents with chip previews.
- **🎙️ Voice Input Simulation**: Dictate queries with animated microphone state.
- **⚙️ Custom Workspace Settings**:
  - System persona instructions
  - Temperature slider (creativity vs determinism)
  - Streaming speed selection
  - Sound effect preferences

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:5174/](http://localhost:5174/) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```
├── public/
│   ├── bot-avatar.jpg       # Glowing neural orb AI avatar
│   └── user-avatar.jpg      # Stylized 3D user avatar
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── ChatInput.tsx    # Auto-resizing prompt capsule with upload & voice
│   │   ├── ChatMessage.tsx  # Rich markdown message bubble with copy actions
│   │   ├── Header.tsx       # Model picker, theme toggle, and export buttons
│   │   ├── QuickPrompts.tsx # Prompt suggestion cards
│   │   ├── SettingsModal.tsx# Temperature & persona configuration modal
│   │   └── Sidebar.tsx      # Multi-conversation history & search filter
│   ├── data/
│   │   └── initialData.ts   # Presets for models, personas, and prompts
│   ├── utils/
│   │   └── aiEngine.ts      # Contextual response generator & token streamer
│   ├── types.ts             # TypeScript interfaces for messages and models
│   ├── App.css              # Glassmorphic component styles & layouts
│   ├── index.css            # Root design system tokens & typography
│   ├── App.tsx              # Main orchestrator & localStorage persistence
│   └── main.tsx             # Application entry point
├── package.json
└── vite.config.ts
```
