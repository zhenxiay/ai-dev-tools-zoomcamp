# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

## Installation Steps

### Step 1: Install Dependencies

You have two options:

**Option A: Install all at once (Recommended)**

```powershell
# From the project root
cd c:\Users\YUZ1KA\ai-dev-tools-zoomcamp\week2\homework

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

**Option B: Use the convenience script**

```powershell
cd c:\Users\YUZ1KA\ai-dev-tools-zoomcamp\week2\homework
npm run install:all
```

### Step 2: Set Up Environment Variables

**Server:**
```powershell
cd server
cp .env.example .env
```

**Client:**
```powershell
cd client
cp .env.example .env
```

### Step 3: Start Development Servers

**From project root:**
```powershell
npm run dev
```

This will start both:
- Server on http://localhost:3000
- Client on http://localhost:5173

**Or start separately:**

Terminal 1 (Server):
```powershell
cd server
npm run dev
```

Terminal 2 (Client):
```powershell
cd client
npm run dev
```

### Step 4: Open the Application

Navigate to http://localhost:5173 in your browser.

## Testing the Application

1. **Create a Session**
   - Enter your name
   - Click "Create New Session"
   - Copy the session link

2. **Join from Another Browser/Tab**
   - Open the copied link in a new tab or incognito window
   - Enter a different name
   - Click "Join Session"

3. **Test Collaboration**
   - Type code in one window
   - See it appear in real-time in the other window
   - Try changing the language
   - Click "Run Code" to execute

## Running Tests

```powershell
# Run all tests
npm test

# Run server tests only
cd server
npm test

# Run client tests only  
cd client
npm test
```

## Building for Production

```powershell
# Build client
cd client
npm run build

# The built files will be in client/dist/
```

## Docker

**Build:**
```powershell
docker build -t collaborative-coding-platform .
```

**Run:**
```powershell
docker run -p 3000:3000 collaborative-coding-platform
```

Access at http://localhost:3000

## Troubleshooting

### Port Already in Use

If you see "EADDRINUSE" error:

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Dependencies Not Installing

If behind a corporate proxy:

```powershell
# Set npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Or bypass proxy for specific registries
npm config set registry https://registry.npmjs.org/
```

### WebSocket Connection Issues

1. Check if server is running on port 3000
2. Check CORS settings in `server/server.js`
3. Ensure firewall allows WebSocket connections
4. Try disabling browser extensions

### Pyodide Not Loading

1. Check internet connection (Pyodide loads from CDN)
2. Check browser console for errors
3. Try clearing browser cache
4. Ensure the CDN URL is accessible

## Next Steps

1. Read the full [README.md](./README.md) for detailed documentation
2. Check [HOMEWORK_ANSWERS.md](./HOMEWORK_ANSWERS.md) for homework responses
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment options
4. See [DOCKER.md](./DOCKER.md) for containerization details
5. Check [AGENTS.md](./AGENTS.md) for Git workflow commands

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the error messages in the terminal
3. Check browser console for client-side errors
4. Ensure all dependencies are installed correctly
5. Try clearing node_modules and reinstalling

## Features to Try

- ✅ Create multiple sessions
- ✅ Join sessions from different browsers
- ✅ Real-time code editing
- ✅ Language switching (JavaScript ↔ Python)
- ✅ Code execution
- ✅ User presence indicators
- ✅ Copy session links
- ✅ Multiple users per session

Enjoy coding! 🚀
