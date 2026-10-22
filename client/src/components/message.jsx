function Message({ message }) {
  const isAssistant = message.role === 'assistant'

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message.text)
    } catch {
      // Clipboard access can be unavailable when the page is not using HTTPS.
    }
  }

  return (
    <article className={`message-row ${isAssistant ? 'assistant-message' : 'user-message'}`}>
      {isAssistant && <div className="message-avatar" aria-hidden="true">✳</div>}
      <div className="message-content">
        <div className="message-author">{isAssistant ? 'Muse' : 'You'}</div>
        <div className="message-bubble">{message.text}</div>
        {isAssistant && <div className="message-actions"><button onClick={copyMessage} title="Copy response" aria-label="Copy response">▢</button><button title="Good response" aria-label="Good response">♡</button><button title="Try again" aria-label="Try again">↻</button></div>}
      </div>
      {!isAssistant && <div className="user-avatar" aria-hidden="true">M</div>}
    </article>
  )
}

export default Message
