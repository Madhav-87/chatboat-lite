import { useState } from 'react'
import ChatWindow from './components/chatWindow.jsx'
import { getAssistantReply } from './services/chatService.js'
import './App.css'

const starterIdeas = [
  'Help me untangle an idea',
  'Make a plan for my week',
  'Teach me something surprising',
]

function App() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isDark, setIsDark] = useState(true)

  async function sendMessage(text) {
    const cleanText = text.trim()
    if (!cleanText || isTyping) return

    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: 'user', text: cleanText }])
    setIsTyping(true)

    try {
      const reply = await getAssistantReply(cleanText)
      setMessages((current) => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', text: reply }])
    } catch {
      setMessages((current) => [...current, {
        id: `${Date.now()}-error`,
        role: 'assistant',
        text: 'I couldn’t reach the chat service. Please try again in a moment.',
      }])
    } finally {
      setIsTyping(false)
    }
  }

  function startNewChat() {
    setMessages([])
    setIsTyping(false)
  }

  return (
    <div className={`app-shell${isDark ? ' dark-mode' : ''}`}>
      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-brand"><span className="brand-mark" aria-hidden="true">✳</span><span className="brand-name">muse<span>.</span></span></div>
          <div className="topbar-actions">
            <span className="model-badge"><span className="model-dot" /> Muse 1.0 <span className="chevron">⌄</span></span>
            <button className="icon-button theme-button" onClick={() => setIsDark((value) => !value)} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle theme">{isDark ? '☼' : '◐'}</button>
            {messages.length > 0 && !isTyping && <button className="new-chat-top-button" onClick={startNewChat}>＋ <span>New chat</span></button>}
          </div>
        </header>

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          starterIdeas={starterIdeas}
          onSend={sendMessage}
        />
        <footer className="app-footer">Muse can make mistakes. Double-check important information.</footer>
      </main>
    </div>
  )
}

export default App
