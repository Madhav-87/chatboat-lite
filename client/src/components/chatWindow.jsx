import { useEffect, useRef, useState } from 'react'
import Message from './message.jsx'

function ChatWindow({ messages, isTyping, starterIdeas, onSend }) {
  const [draft, setDraft] = useState('')
  const [fileName, setFileName] = useState('')
  const messagesEndRef = useRef(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSubmit(event) {
    event.preventDefault()
    if (!draft.trim() || isTyping) return
    onSend(draft)
    setDraft('')
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <section className={`chat-area${hasMessages ? ' has-messages' : ''}`} aria-label="Chat with Muse">
      {hasMessages ? (
        <div className="message-list">
          {messages.map((message) => <Message key={message.id} message={message} />)}
          {isTyping && <div className="typing-row"><div className="message-avatar" aria-hidden="true">✳</div><div className="typing-bubble" aria-label="Muse is thinking"><span /><span /><span /></div></div>}
          <div ref={messagesEndRef} />
        </div>
      ) : (
        <div className="welcome-content">
          <h1>What would you like to explore?</h1>
          <div className="starter-ideas" aria-label="Try a starter idea">
            {starterIdeas.map((idea) => <button key={idea} onClick={() => onSend(idea)}>{idea}<span aria-hidden="true">↗</span></button>)}
          </div>
        </div>
      )}

      <div className="composer-wrap">
        {fileName && <div className="attachment-chip">▧ {fileName}<button onClick={() => setFileName('')} aria-label="Remove attachment">×</button></div>}
        <form className="composer" onSubmit={handleSubmit}>
          <div className="composer-tools">
            <label className="tool-button attach-button" title="Attach a file">＋<input type="file" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} /></label>
          </div>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything, or share an idea..."
            aria-label="Write a message"
            rows="1"
          />
          <div className="send-tools"><button type="submit" className="send-button" disabled={!draft.trim() || isTyping} aria-label="Send message">↑</button></div>
        </form>
      </div>
    </section>
  )
}

export default ChatWindow
