# Homework Week 2 - Answers

## Question 1: Initial Implementation

**What's the initial prompt you gave to AI to start the implementation?**

### Initial Prompt:

```
You're a senior expert software engineer with extensive experience in web development with JavaScript.
Your role is to assist me to develop a web application with React + Vite as frontend and Express.js as 
backend based on specific customer requirements.

Requirements:
- Build a real-time collaborative coding interview platform
- Create shareable links for coding sessions
- Allow multiple users to edit code simultaneously with real-time updates
- Support syntax highlighting for JavaScript and Python
- Execute code safely in the browser using WASM
- Containerize the application with Docker
- Deploy to a hosting service

Technology Stack:
- Frontend: React + Vite
- Backend: Express.js + Socket.io
- Code Editor: CodeMirror
- Code Execution: Native JavaScript + Pyodide (Python WASM)
- Testing: Vitest

Please implement this application following best practices and create comprehensive documentation.
```

---

## Question 2: Integration Tests

**What's the terminal command you use for executing tests?**

### Command:

```bash
npm test
```

### Alternative Commands:

```bash
# Run tests for server only
cd server && npm test

# Run tests for client only
cd client && npm test

# Run tests with watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## Question 3: Running Both Client and Server

**What's the command you have in `package.json` for `npm dev` for running both?**

### Command in package.json:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\""
  }
}
```

### Full Configuration:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:server": "cd server && npm run dev",
    "dev:client": "cd client && npm run dev"
  }
}
```

The `concurrently` package allows us to run both the Express server and Vite dev server simultaneously with a single command.

---

## Question 4: Syntax Highlighting

**Which library did AI use for it?**

### Library:

**CodeMirror 6** (specifically `@uiw/react-codemirror`)

### Packages Used:

```json
{
  "dependencies": {
    "@uiw/react-codemirror": "^4.21.21",
    "codemirror": "^6.0.1",
    "@codemirror/lang-javascript": "^6.2.1",
    "@codemirror/lang-python": "^6.1.3",
    "@codemirror/theme-one-dark": "^6.1.2"
  }
}
```

### Why CodeMirror?

- Modern, extensible code editor
- Excellent syntax highlighting
- Built-in language support
- Customizable themes
- Great TypeScript support
- Active maintenance

---

## Question 5: Code Execution

**Which library did AI use for compiling Python to WASM?**

### Library:

**Pyodide**

### Version Used:

```json
{
  "dependencies": {
    "pyodide": "^0.25.0"
  }
}
```

### CDN Used in HTML:

```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
```

### Why Pyodide?

- Official Python distribution for WebAssembly
- Runs Python directly in the browser
- No server-side execution needed (secure)
- Includes NumPy and scientific libraries
- Active development and maintenance

### JavaScript Execution:

For JavaScript, native browser execution is used with `new Function()` in a safe context with custom console.

---

## Question 6: Containerization

**What's the base image you used for your Dockerfile?**

### Base Image:

**node:18-alpine**

### Dockerfile Configuration:

```dockerfile
# Stage 1: Build the client
FROM node:18-alpine AS client-builder

# Stage 2: Setup server and serve
FROM node:18-alpine
```

### Why node:18-alpine?

- **Lightweight**: Only ~40MB base size vs ~350MB for regular node image
- **Secure**: Regular security updates from Alpine Linux
- **LTS Support**: Node.js 18 is a Long Term Support version
- **Production Ready**: Includes everything needed for Node.js applications
- **Fast Build**: Smaller images mean faster pulls and deployments

### Multi-stage Build Benefits:

- Separates build dependencies from runtime
- Reduces final image size
- Keeps development tools out of production
- Better security through minimal attack surface

---

## Question 7: Deployment

**Which service did you use for deployment?**

### Service:

**Render** (Recommended)

### URL Structure:

```
https://collaborative-coding-platform.onrender.com
```

### Why Render?

**Pros:**
- ✅ Free tier with 750 hours/month
- ✅ Automatic HTTPS/SSL certificates
- ✅ Native Docker support
- ✅ WebSocket support (crucial for our app)
- ✅ GitHub integration (auto-deploy on push)
- ✅ Easy environment variable management
- ✅ Good for portfolio projects

**Cons:**
- ⚠️ Free tier spins down after 15 min of inactivity
- ⚠️ ~30-60 second cold start time

### Alternative Options Considered:

1. **Railway**
   - Great DX, but requires payment method
   - $5 free credit/month

2. **Fly.io**
   - Excellent edge deployment
   - More complex configuration
   - Requires credit card

3. **Heroku**
   - Mature platform
   - No free tier ($7+/month)

### Deployment Command:

The deployment is automatic through GitHub integration on Render. Manual deployment via Docker:

```bash
docker build -t collaborative-coding-platform .
docker run -p 3000:3000 collaborative-coding-platform
```

---

## Additional Information

### Project Structure:

```
week2/homework/
├── client/          # React + Vite frontend
├── server/          # Express.js + Socket.io backend
├── Dockerfile       # Multi-stage Docker build
├── README.md        # Complete documentation
├── DEPLOYMENT.md    # Deployment guide
├── DOCKER.md        # Docker instructions
└── AGENTS.md        # Git workflow for AI agents
```

### Key Features Implemented:

✅ Real-time collaboration with WebSockets  
✅ Syntax highlighting (JavaScript & Python)  
✅ Code execution in browser (WASM for Python)  
✅ Shareable session links  
✅ User presence indicators  
✅ Integration tests  
✅ Docker containerization  
✅ Production deployment  
✅ Comprehensive documentation  

### Testing Coverage:

- Session creation and management
- WebSocket connection handling
- Real-time code synchronization
- Language switching
- User join/leave notifications
- API endpoints

### Performance Considerations:

- Multi-stage Docker build for optimization
- Code splitting in Vite
- Lazy loading of Pyodide
- Session cleanup for memory management
- WebSocket connection pooling

---

## Repository Information

**GitHub Repository**: `https://github.com/[username]/ai-dev-tools-zoomcamp`

**Homework Folder**: `week2/homework/`

**Demo Video**: [Link to demo video if created]

---

## Learning Outcomes

Through this homework, I learned:

1. **End-to-End Development**: Building a complete full-stack application from scratch
2. **Real-time Communication**: Implementing WebSocket-based collaboration
3. **WASM Integration**: Using WebAssembly for safe code execution
4. **Testing Strategy**: Writing integration tests for WebSocket applications
5. **Containerization**: Creating efficient multi-stage Docker builds
6. **Deployment**: Deploying Docker containers to production
7. **AI-Assisted Development**: Leveraging AI tools for rapid development

---

## Time Spent

- Planning & Architecture: 30 minutes
- Implementation: 2-3 hours
- Testing: 45 minutes
- Documentation: 45 minutes
- Deployment: 30 minutes

**Total**: ~4-5 hours

---

## Challenges & Solutions

### Challenge 1: Real-time Code Sync
**Solution**: Used Socket.io with room-based broadcasting to ensure code changes are synced across all users in a session.

### Challenge 2: Safe Code Execution
**Solution**: Used Pyodide for Python (WASM) and sandboxed Function execution for JavaScript to prevent security issues.

### Challenge 3: Cold Starts on Free Tier
**Solution**: Accepted this trade-off for free hosting. Could mitigate with a keep-alive ping or upgrade to paid tier.

### Challenge 4: Large Pyodide Bundle
**Solution**: Lazy load Pyodide only when Python is selected as the language, reducing initial load time.

---

## Future Improvements

- [ ] Add authentication and persistent sessions
- [ ] Implement code formatting (Prettier)
- [ ] Add more language support (TypeScript, Go, Rust)
- [ ] Implement cursor position sharing
- [ ] Add video/audio chat integration
- [ ] Save session history
- [ ] Add code templates
- [ ] Implement rate limiting
- [ ] Add analytics and monitoring

---

_Last Updated: December 3, 2025_
