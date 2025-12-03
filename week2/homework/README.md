# Collaborative Coding Platform

A real-time collaborative coding interview platform built with React, Vite, Express.js, and WebSockets.

## Features

- 🔗 **Shareable Links**: Create a session and share the link with candidates
- ⚡ **Real-time Collaboration**: Multiple users can edit code simultaneously
- 🎨 **Syntax Highlighting**: Support for JavaScript and Python via CodeMirror
- 🚀 **Code Execution**: Run code safely in the browser using WASM (Pyodide for Python)
- 👥 **User Presence**: See who's online in the session
- 🌐 **WebSocket Communication**: Real-time updates using Socket.io

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + Socket.io
- **Code Editor**: CodeMirror 6
- **Code Execution**: Native JavaScript + Pyodide (Python WASM)
- **Testing**: Vitest
- **Styling**: CSS

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Home.jsx
│   │   │   └── CodeEditor.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                # Backend Express server
│   ├── server.js
│   ├── server.test.js
│   ├── vitest.config.js
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Install Dependencies

```bash
# Install root dependencies
npm install

# Install all dependencies (root, client, and server)
npm run install:all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Running the Application

### Development Mode (Recommended)

Run both client and server concurrently:

```bash
npm run dev
```

This command will:
- Start the Express server on `http://localhost:3000`
- Start the Vite dev server on `http://localhost:5173`

### Running Separately

**Server:**
```bash
cd server
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

## Testing

### Run All Tests

```bash
npm test
```

### Run Server Tests Only

```bash
cd server
npm test
```

### Run Client Tests Only

```bash
cd client
npm test
```

## Usage

1. **Create a Session**:
   - Open the app at `http://localhost:5173`
   - Enter your name
   - Click "Create New Session"
   - Share the generated link with others

2. **Join a Session**:
   - Open the shared link or enter the session ID
   - Enter your name
   - Click "Join Session"

3. **Collaborate**:
   - Write code in the editor
   - See real-time updates from other users
   - Switch between JavaScript and Python
   - Run code and see output

4. **Run Code**:
   - Write your code in the editor
   - Click "▶️ Run Code"
   - View output in the right panel

## API Endpoints

### REST API

- `POST /api/sessions` - Create a new session
- `GET /api/sessions/:sessionId` - Get session information
- `GET /health` - Health check

### WebSocket Events

**Client → Server:**
- `join-session` - Join a coding session
- `code-change` - Send code updates
- `language-change` - Change programming language

**Server → Client:**
- `session-state` - Initial session state
- `code-update` - Code changed by another user
- `language-update` - Language changed
- `user-joined` - New user joined
- `user-left` - User disconnected

## Building for Production

### Build Client

```bash
cd client
npm run build
```

The built files will be in `client/dist/`.

### Preview Production Build

```bash
cd client
npm run preview
```

## Environment Variables

### Client

Create a `.env` file in the `client` directory:

```env
VITE_SERVER_URL=http://localhost:3000
```

### Server

Create a `.env` file in the `server` directory:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Containerization

See [DOCKER.md](./DOCKER.md) for containerization instructions.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions.

## Libraries Used

- **CodeMirror 6** (`@uiw/react-codemirror`) - Syntax highlighting and code editing
- **Pyodide** - Python WASM compiler for browser execution
- **Socket.io** - Real-time WebSocket communication
- **Express.js** - Backend server framework
- **React** - Frontend UI library
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
