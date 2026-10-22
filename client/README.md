# Muse AI Chat

A beginner-friendly React chat interface. It runs with sample replies by default, so you can explore the UI before connecting an AI backend.

## Start the app

Open a terminal in the `client` folder and run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite in your browser.

## Connect a chat API

Copy `.env.example` to `.env` in this folder and set `VITE_CHAT_API_URL` to your chat endpoint. The endpoint should accept a JSON `POST` body such as `{ "message": "Hello" }` and return `{ "reply": "Hi!" }`. Restart Vite after changing `.env`.

## Where things live

- `src/App.jsx` stores the current chat and connects the UI to the reply service.
- `src/components/chatWindow.jsx` shows the welcome screen, messages, and message box.
- `src/components/message.jsx` displays one chat message.
- `src/services/chatService.js` provides sample replies or calls your configured API.
- `src/App.css` contains the chat layout, colors, and responsive styles.
