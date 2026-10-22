// Set VITE_CHAT_API_URL in client/.env to connect this interface to your own API.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL

export async function getAssistantReply(message) {
  if (CHAT_API_URL) {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) throw new Error('The chat API returned an error.')
    const data = await response.json()
    return data.reply ?? data.message ?? 'Your chat service sent an empty reply.'
  }

  // A small local reply keeps the app usable before a backend is connected.
  await new Promise((resolve) => window.setTimeout(resolve, 20000))
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hi! I’m Muse, your little thinking partner. What would you like to explore today?'
  }
  if (lowerMessage.includes('write') || lowerMessage.includes('introduction')) {
    return 'Absolutely. A good introduction feels warm and specific. Start with what you do, add what you care about, then invite people to explore your work. Want to tell me a little about your portfolio so I can draft one?'
  }
  if (lowerMessage.includes('plan') || lowerMessage.includes('today')) {
    return 'Let’s keep it simple: choose one important task, one quick win, and one proper break. Write down your top priority first, then give it a 25-minute focus session. What would you most like to get done?'
  }
  if (lowerMessage.includes('explain') || lowerMessage.includes('learn')) {
    return 'Here’s a simple way to think about it: the internet is a huge network of computers that send information to each other. When you open a website, your device asks another computer for the page, and that computer sends it back. Would you like an everyday analogy or a slightly deeper explanation?'
  }
  return `That’s an interesting thought. Let’s break it down together: “${message}”\n\nWhat would be most helpful next: a quick answer, a step-by-step explanation, or a few ideas to explore?`
}
