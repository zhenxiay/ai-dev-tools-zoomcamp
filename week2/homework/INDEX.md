# 🚀 Collaborative Coding Platform - Week 2 Homework

> A real-time collaborative coding interview platform built with React, Vite, Express.js, and WebSockets.

---

## 🎯 Quick Navigation

### 🏁 Getting Started
- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup guide (start here!)
- **[README.md](./README.md)** - Complete documentation
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues & solutions

### 📝 Homework
- **[HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md)** - All homework answers
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Project overview

### 🚀 Deployment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to Render, Railway, Fly.io, etc.
- **[DOCKER.md](./DOCKER.md)** - Containerization guide

### 🛠️ Development
- **[AGENTS.md](./AGENTS.md)** - Git workflow for AI assistants
- **[CHECKLIST.md](./CHECKLIST.md)** - Project completion checklist
- **[FILE_MANIFEST.md](./FILE_MANIFEST.md)** - Complete file listing

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm run install:all

# 2. Start development servers
npm run dev

# 3. Open browser
# Client: http://localhost:5173
# Server: http://localhost:3000
```

---

## ✨ Key Features

✅ **Real-time Collaboration** - Multiple users edit code simultaneously  
✅ **Syntax Highlighting** - JavaScript & Python support via CodeMirror  
✅ **Code Execution** - Run code safely in browser (WASM for Python)  
✅ **Shareable Links** - Create and share session links  
✅ **User Presence** - See who's online in your session  
✅ **WebSocket Communication** - Instant updates via Socket.io  
✅ **Docker Ready** - Multi-stage build for production  
✅ **Tested** - Integration tests included  

---

## 📚 Documentation Index

### Core Documentation
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [README.md](./README.md) | Complete project docs | 10 min |
| [QUICKSTART.md](./QUICKSTART.md) | Fast setup | 5 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | High-level overview | 5 min |

### Homework
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md) | All homework Q&A | 5 min |

### Deployment & DevOps
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Platform deployment guides | 10 min |
| [DOCKER.md](./DOCKER.md) | Docker instructions | 5 min |

### Development
| Document | Purpose | Read Time |
|----------|---------|-----------|
| [AGENTS.md](./AGENTS.md) | Git workflow | 5 min |
| [CHECKLIST.md](./CHECKLIST.md) | Progress tracking | 5 min |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Problem solving | 10 min |
| [FILE_MANIFEST.md](./FILE_MANIFEST.md) | File listing | 5 min |

**Total Reading Time**: ~60 minutes for complete understanding

---

## 📦 Project Structure

```
week2/homework/
│
├── 📄 Documentation (14 files)
│   ├── INDEX.md                    ← You are here
│   ├── README.md                   ← Main documentation
│   ├── QUICKSTART.md              ← Fast setup
│   ├── HOMEWORK_ANSWERS.md        ← Homework responses
│   ├── PROJECT_SUMMARY.md         ← Overview
│   ├── DEPLOYMENT.md              ← Deploy guides
│   ├── DOCKER.md                  ← Docker guide
│   ├── AGENTS.md                  ← Git workflow
│   ├── CHECKLIST.md               ← Progress tracker
│   ├── TROUBLESHOOTING.md         ← Solutions
│   └── FILE_MANIFEST.md           ← File list
│
├── 🖥️ Server (5 files)
│   ├── server.js                  ← Express + Socket.io
│   ├── server.test.js             ← Integration tests
│   ├── vitest.config.js           ← Test config
│   ├── package.json               ← Dependencies
│   └── .env.example               ← Environment template
│
├── 💻 Client (9 files)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx           ← Landing page
│   │   │   └── CodeEditor.jsx     ← Main editor
│   │   ├── App.jsx                ← Root component
│   │   ├── App.css                ← Styles
│   │   ├── index.css              ← Global styles
│   │   └── main.jsx               ← Entry point
│   ├── index.html                 ← HTML template
│   ├── vite.config.js             ← Vite config
│   ├── package.json               ← Dependencies
│   └── .env.example               ← Environment template
│
└── 🐳 Config (4 files)
    ├── package.json               ← Root package.json
    ├── Dockerfile                 ← Multi-stage build
    ├── .dockerignore              ← Docker ignore
    └── .gitignore                 ← Git ignore
```

**Total**: 27 files, ~4,200 lines of code + documentation

---

## 🎓 Homework Answers Quick Reference

| Question | Answer |
|----------|--------|
| **Q1: Initial Prompt** | Full-stack collaborative coding platform with React + Vite + Express |
| **Q2: Test Command** | `npm test` |
| **Q3: Dev Command** | `concurrently "npm run dev:server" "npm run dev:client"` |
| **Q4: Syntax Highlighting** | **CodeMirror 6** (`@uiw/react-codemirror`) |
| **Q5: Python WASM** | **Pyodide 0.25** |
| **Q6: Docker Base Image** | **node:18-alpine** |
| **Q7: Deployment** | **Render** (recommended) |

📄 **Full answers**: [HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md)

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite 5
- CodeMirror 6
- Socket.io Client
- Pyodide (Python WASM)

### Backend
- Express.js 4
- Socket.io 4
- Node.js 18

### Testing
- Vitest 1.0
- Supertest

### DevOps
- Docker
- Render (deployment)

---

## 📊 Commands Cheat Sheet

### Development
```bash
npm run dev              # Start both client & server
npm run dev:server       # Start server only
npm run dev:client       # Start client only
```

### Testing
```bash
npm test                 # Run all tests
cd server && npm test    # Server tests only
cd client && npm test    # Client tests only
```

### Building
```bash
cd client && npm run build    # Build client for production
docker build -t app .         # Build Docker image
docker run -p 3000:3000 app   # Run container
```

### Installation
```bash
npm run install:all      # Install all dependencies
npm install              # Install root dependencies
```

---

## 🚦 Status

| Component | Status |
|-----------|--------|
| Implementation | ✅ Complete |
| Testing | ✅ Complete |
| Documentation | ✅ Complete |
| Docker | ✅ Complete |
| Deployment Guide | ✅ Complete |
| Homework Answers | ✅ Complete |

**Overall**: 🎉 **100% Complete & Ready for Submission**

---

## 🎯 Next Steps

### For New Users
1. Read [QUICKSTART.md](./QUICKSTART.md)
2. Install dependencies
3. Start development servers
4. Test the application

### For Deployment
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Build Docker image
3. Deploy to Render
4. Test production deployment

### For Submission
1. Review [HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md)
2. Commit to GitHub
3. Submit homework form
4. Share on LinkedIn/Twitter

---

## 🆘 Need Help?

1. **Setup Issues**: See [QUICKSTART.md](./QUICKSTART.md)
2. **Errors**: See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
3. **Features**: See [README.md](./README.md)
4. **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Git**: See [AGENTS.md](./AGENTS.md)

---

## 📈 Project Stats

- **Files Created**: 27
- **Lines of Code**: ~1,600
- **Lines of Docs**: ~2,600
- **Dependencies**: 22 packages
- **Development Time**: ~4-5 hours
- **Features**: 8 major features
- **Tests**: 6 integration tests

---

## 🎨 Screenshots & Demo

### Creating a Session
1. Enter your name
2. Click "Create New Session"
3. Share the link

### Collaborative Editing
1. Open link in multiple browsers
2. Type code in one window
3. See real-time updates in others

### Code Execution
1. Write JavaScript or Python code
2. Click "▶️ Run Code"
3. View output in right panel

---

## 🌟 Highlights

This project demonstrates:
- ✅ Modern full-stack development
- ✅ Real-time WebSocket communication
- ✅ Safe browser-based code execution
- ✅ Comprehensive testing strategy
- ✅ Production-ready containerization
- ✅ Clear documentation practices
- ✅ Effective use of AI assistants

---

## 📝 License

MIT License - Feel free to use this project as a template or learning resource.

---

## 🤝 Contributing

This is a homework project, but feedback is welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🙏 Acknowledgments

- **DataTalks.Club** - For the AI Dev Tools Zoomcamp
- **CodeMirror** - Excellent code editor
- **Pyodide** - Python in the browser
- **Socket.io** - Real-time communication
- **Vite** - Lightning-fast build tool

---

## 📧 Contact

For course-related questions, use the course Slack/Discord.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Socket.io Docs](https://socket.io/docs/)
- [CodeMirror 6](https://codemirror.net/)
- [Pyodide](https://pyodide.org/)
- [Docker Guide](https://docs.docker.com/)

---

## 🗺️ Roadmap (Future Enhancements)

- [ ] Add TypeScript support
- [ ] Implement user authentication
- [ ] Add more languages (Go, Rust, Java)
- [ ] Persistent session storage
- [ ] Code formatting (Prettier)
- [ ] Cursor position sharing
- [ ] Video/audio chat
- [ ] Code templates library
- [ ] Syntax error highlighting
- [ ] Autocomplete suggestions

---

**Ready to get started?** 👉 Head to [QUICKSTART.md](./QUICKSTART.md)

**Need homework answers?** 👉 See [HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md)

**Want to deploy?** 👉 Check [DEPLOYMENT.md](./DEPLOYMENT.md)

---

<div align="center">

**Built with ❤️ for AI Dev Tools Zoomcamp Week 2**

🚀 Happy Coding! 🚀

</div>
