# 🤖 Muse - Local AI Chatbot

Muse is a simple web chat app for asking questions and getting text replies from an AI model. The React interface sends each prompt to a small Python API, which passes it to an Ollama model and returns the answer. The project is designed to make the connection between a web interface and a locally hosted AI model easy to understand.

## 🎯 Project goals

The project provides a straightforward way to try an open-source language model through a browser instead of typing prompts in a command line. It also demonstrates how a frontend, a backend API, and an AI model can work together while keeping model connection settings outside the source code.

## ✨ Features

- Send a text prompt and display the assistant's response.
- Show the conversation for the current browser session, including a thinking indicator while the reply is being generated.
- Start a new chat by clearing the current conversation.
- Use starter prompts, switch between light and dark themes, and copy an assistant response.
- Call the backend with JSON and show a friendly error message if the service cannot be reached.
- Connect the backend to an Ollama model selected in the server environment settings.

Conversation history is held in the browser while the page is open. It is not saved to a database.

## 🧰 Tech stack

| Part | Tools |
| --- | --- |
| Frontend | JavaScript, React, Vite, HTML, CSS |
| Backend | Python, FastAPI, Pydantic, Uvicorn |
| Model connection | Ollama Python client and an Ollama model |
| Configuration | `python-dotenv` and environment files |
| API format | HTTP `POST` with JSON |

The SRS mentions Docker as a possible backend tool. The current repository does not include a Dockerfile or Compose configuration; the setup below runs the services directly on your computer.

## 🏗️ System architecture

```mermaid
flowchart LR
    U[User] -->|Types a prompt| W[React web app\nVite development server]
    W -->|POST /chat\n{ message: "..." }| A[FastAPI backend]
    A -->|Prompt and model name| O[Ollama service]
    O -->|Generated text| A
    A -->|JSON { message: "..." }| W
    W -->|Shows reply| U
```

The browser sends a request to the backend's `/chat` endpoint. The API validates the message, calls the configured Ollama model, and returns the response as JSON. The model call receives the latest prompt; the current backend does not send earlier chat messages as model context.

## 📸 Screenshots and demo

There is no hosted demo or screenshot committed with the current project. To add a screenshot, save one from the running app as `docs/images/chat-interface.png` and update this section, for example:

```md
![Muse chat interface](docs/images/chat-interface.png)
```

## ✅ Prerequisites

- Git
- Node.js and npm (a current LTS release is recommended)
- Python 3.10 or later
- [Ollama](https://ollama.com/download) installed and running
- An Ollama model downloaded on the computer running Ollama

Check that the tools are available:

```powershell
node --version
npm --version
py --version
ollama --version
```

## 📦 Installation and configuration

Clone the repository and open its folder:

```powershell
git clone <repository-url>
cd aiChatBot
```

### 1. 🦙 Prepare Ollama

Start the Ollama service, then download a model if you do not already have one. For example:

```powershell
ollama pull llama3.2
```

Use a model name that is installed in Ollama for `MODEL_CHOICE` below. You can choose another model supported by your computer.

### 2. ⚙️ Configure the backend

Create `server/.env` with these settings. Replace the sample model name if you downloaded a different model. Add the address where the browser will open the frontend to the allowed origins.

```env
HOST_URL=http://localhost:11434
MODEL_CHOICE=llama3.2
ALLOW_ORIGIN_URL_1=http://localhost:5173
ALLOW_ORIGIN_URL_2=http://127.0.0.1:5173
```

Create a virtual environment and install the Python packages:

```powershell
cd server
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
cd ..
```

If PowerShell blocks virtual environment activation, use Command Prompt and run `server\.venv\Scripts\activate.bat`, or call `server\.venv\Scripts\python.exe` directly.

### 3. 🖥️ Configure the frontend

Create `client/.env`:

```env
VITE_CHAT_API_URL=http://127.0.0.1:8000/chat
```

Install the JavaScript packages:

```powershell
cd client
npm install
cd ..
```

The repository ignores `.env` files. Keep your local configuration there and do not commit secrets or private service addresses.

## ▶️ Run the project

Start Ollama first. Then open two terminals in the repository folder.

**Terminal 1 — backend**

```powershell
cd server
.\.venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`. Its interactive API page is at `http://127.0.0.1:8000/docs`.

**Terminal 2 — frontend**

```powershell
cd client
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

## 🧪 Test and build checks

There is no automated backend test suite in the repository yet. You can run the frontend's lint and production build checks:

```powershell
cd client
npm run lint
npm run build
```

To check the API manually while the backend and Ollama are running, use PowerShell:

```powershell
Invoke-RestMethod -Uri 'http://127.0.0.1:8000/chat' `
  -Method Post `
  -ContentType 'application/json' `
  -Body '{"message":"Explain what an AI chatbot is in one sentence."}'
```

A successful response contains a `message` field with the model's answer. The same request can be tried in the FastAPI page at `/docs` or with Postman.

## 🗂️ Project structure

```text
aiChatBot/
├── client/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── chatWindow.jsx  # Welcome view, prompt box, and message list
│   │   │   └── message.jsx     # Individual chat message
│   │   ├── services/
│   │   │   └── chatService.js  # Sends prompts to the configured API
│   │   ├── App.jsx             # Chat state and page layout
│   │   ├── App.css             # Chat styles
│   │   └── main.jsx            # React entry point
│   ├── package.json
│   └── vite.config.js
└── server/
    ├── services/
    │   └── ai_service.py       # Calls the Ollama model
    ├── config.py               # Loads backend environment settings
    ├── main.py                 # FastAPI app and POST /chat endpoint
    └── requirements.txt
```

## 🔐 Configuration and security

| Variable | File | Purpose |
| --- | --- | --- |
| `HOST_URL` | `server/.env` | Ollama service address, usually `http://localhost:11434` |
| `MODEL_CHOICE` | `server/.env` | Installed Ollama model name to use for replies |
| `ALLOW_ORIGIN_URL_1` | `server/.env` | First browser origin allowed to call the API |
| `ALLOW_ORIGIN_URL_2` | `server/.env` | Second browser origin allowed to call the API |
| `VITE_CHAT_API_URL` | `client/.env` | Full backend chat endpoint used by the frontend |

The chat endpoint accepts a `message` string between 1 and 5,000 characters. Do not put passwords, API tokens, or other secrets in prompts. The backend currently does not store chat messages, but prompts are sent to the Ollama service configured by `HOST_URL`; use a local Ollama address if you want model requests to remain on your computer. Keep `.env` files private and do not commit them.

## 🚀 Future improvements and current limits

- Save and reload conversation history.
- Add accounts and user-specific settings.
- Let users choose between installed models.
- Add file or image input after implementing backend support for it.
- Expand automated tests for API validation, model errors, and frontend request states.
- Improve model connection error details and retry behavior.

The first version handles text prompts and responses only. It has no login, persistent storage, or file/image processing. The response is generated from the latest prompt only, without previous turns as model context.

## 🤝 Contributing

Contributions are welcome. Open an issue to describe a bug or proposed change, then submit a pull request with a short explanation of what changed. Please run `npm run lint` and `npm run build` from `client/` before submitting frontend changes. Keep environment files and other private settings out of commits.

## 📄 License

No license file is included yet. Until a license is added, reuse and redistribution permissions have not been specified.
