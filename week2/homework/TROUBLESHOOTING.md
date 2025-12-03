# 🔧 Troubleshooting Guide

Common issues and their solutions for the Collaborative Coding Platform.

---

## Installation Issues

### Issue: npm install fails with proxy error

**Symptoms:**
```
Error: unable to get local issuer certificate
Error: Proxy Authentication Required
```

**Solutions:**

1. **Configure npm proxy:**
```powershell
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
npm config set strict-ssl false  # Only if necessary
```

2. **Use a different registry:**
```powershell
npm config set registry https://registry.npmjs.org/
```

3. **Clear npm cache:**
```powershell
npm cache clean --force
```

4. **Try yarn instead:**
```powershell
npm install -g yarn
yarn install
```

---

### Issue: Module not found errors

**Symptoms:**
```
Cannot find module 'express'
Cannot find module 'react'
```

**Solutions:**

1. **Ensure you're in the correct directory:**
```powershell
# For server modules
cd server
npm install

# For client modules
cd client
npm install
```

2. **Delete node_modules and reinstall:**
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

---

## Server Issues

### Issue: Port 3000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

1. **Find and kill the process (Windows):**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

2. **Use a different port:**
```powershell
# In server/.env
PORT=3001
```

---

### Issue: Server crashes on startup

**Symptoms:**
```
TypeError: Cannot read property 'listen' of undefined
ReferenceError: io is not defined
```

**Solutions:**

1. **Check all dependencies are installed:**
```powershell
cd server
npm install
```

2. **Verify Node.js version:**
```powershell
node --version  # Should be 18+
```

3. **Check for syntax errors:**
```powershell
node --check server.js
```

---

## Client Issues

### Issue: Vite dev server won't start

**Symptoms:**
```
Error: Cannot find module '@vitejs/plugin-react'
Failed to resolve entry for package
```

**Solutions:**

1. **Reinstall client dependencies:**
```powershell
cd client
rm -rf node_modules
npm install
```

2. **Check vite.config.js is present:**
```powershell
ls vite.config.js
```

3. **Clear Vite cache:**
```powershell
rm -rf node_modules/.vite
```

---

### Issue: React components not rendering

**Symptoms:**
- Blank page
- White screen
- "React is not defined" error

**Solutions:**

1. **Check browser console for errors**

2. **Verify index.html has the root div:**
```html
<div id="root"></div>
```

3. **Check main.jsx imports:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
```

---

## WebSocket Issues

### Issue: WebSocket connection fails

**Symptoms:**
```
WebSocket connection failed
Transport error
polling error
```

**Solutions:**

1. **Verify server is running:**
```powershell
# Check if server responds
curl http://localhost:3000/health
```

2. **Check CORS settings in server.js:**
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});
```

3. **Check firewall settings:**
- Allow port 3000 through firewall
- Disable VPN temporarily

4. **Check client connection URL:**
```javascript
// In client code
const SERVER_URL = 'http://localhost:3000'
```

---

### Issue: Real-time updates not working

**Symptoms:**
- Code changes don't sync
- Users can't see each other's edits
- Language changes don't broadcast

**Solutions:**

1. **Check WebSocket connection status:**
```javascript
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected');
});
```

2. **Verify session ID matches:**
- Check URL parameter
- Check browser console logs

3. **Check socket event names:**
- Ensure client and server use same event names
- Check for typos in event names

---

## Code Execution Issues

### Issue: Pyodide won't load

**Symptoms:**
```
Loading Python environment...
Error loading Python environment
Pyodide is not defined
```

**Solutions:**

1. **Check internet connection:**
- Pyodide loads from CDN
- Requires ~15MB download

2. **Verify script tag in index.html:**
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
```

3. **Try alternative CDN:**
```html
<script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
```

4. **Check browser console for blocked content:**
- Disable ad blockers
- Check Content Security Policy

---

### Issue: JavaScript code won't execute

**Symptoms:**
```
Error: Function is not defined
Syntax error in code
```

**Solutions:**

1. **Check console.log redirection:**
```javascript
const customConsole = {
  log: (...args) => logs.push(args.join(' '))
};
```

2. **Verify Function constructor:**
```javascript
const func = new Function('console', code);
func(customConsole);
```

3. **Check for syntax errors in user code**

---

### Issue: Python code execution fails

**Symptoms:**
```
NameError: name 'print' is not defined
Module not found
```

**Solutions:**

1. **Wait for Pyodide to fully load:**
```javascript
if (!pyodideRef.current) {
  await loadPyodide();
}
```

2. **Check stdout redirection:**
```python
import sys
from io import StringIO
sys.stdout = StringIO()
```

3. **Try simpler code first:**
```python
print("Hello, World!")
```

---

## Testing Issues

### Issue: Tests fail with timeout

**Symptoms:**
```
Test timeout exceeded
Socket connection timeout
```

**Solutions:**

1. **Increase timeout in vitest.config.js:**
```javascript
export default defineConfig({
  test: {
    testTimeout: 10000  // 10 seconds
  }
});
```

2. **Ensure server starts before tests:**
```javascript
beforeAll(async () => {
  await startServer();
  await new Promise(resolve => setTimeout(resolve, 1000));
});
```

---

### Issue: Tests fail with "Address in use"

**Symptoms:**
```
EADDRINUSE: address already in use
```

**Solutions:**

1. **Ensure server cleanup in tests:**
```javascript
afterAll(async () => {
  await closeServer();
});
```

2. **Use different port for tests:**
```javascript
const TEST_PORT = 3001;
```

---

## Docker Issues

### Issue: Docker build fails

**Symptoms:**
```
Error: Cannot find module
npm ERR! code ENOENT
```

**Solutions:**

1. **Check Dockerfile paths:**
```dockerfile
COPY client/package*.json ./
COPY server/package*.json ./
```

2. **Verify .dockerignore:**
```
node_modules
dist
build
```

3. **Build with --no-cache:**
```powershell
docker build --no-cache -t collaborative-coding-platform .
```

---

### Issue: Container runs but app not accessible

**Symptoms:**
- Container starts successfully
- Cannot access app on localhost:3000

**Solutions:**

1. **Check port mapping:**
```powershell
docker run -p 3000:3000 collaborative-coding-platform
```

2. **Check if port is exposed in Dockerfile:**
```dockerfile
EXPOSE 3000
```

3. **Check container logs:**
```powershell
docker logs <container-id>
```

---

## Deployment Issues

### Issue: Build fails on Render

**Symptoms:**
```
Build failed
npm install failed
```

**Solutions:**

1. **Check Render build logs**

2. **Verify Dockerfile is correct**

3. **Ensure all dependencies are in package.json:**
```json
"dependencies": {
  "express": "^4.18.2",
  // ... all production dependencies
}
```

---

### Issue: WebSocket not working in production

**Symptoms:**
- App loads but no real-time updates
- Connection timeout

**Solutions:**

1. **Check CORS for production URL:**
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST']
  }
});
```

2. **Ensure WebSocket upgrade is allowed:**
- Check Render settings
- Verify no proxy blocking WebSocket

3. **Use secure WebSocket (wss://):**
```javascript
const SERVER_URL = 'https://your-app.onrender.com'
```

---

### Issue: Cold start takes too long

**Symptoms:**
- First request after inactivity is slow
- 30-60 second delay

**Solution:**

This is expected on Render's free tier. Options:

1. **Accept the delay** (it's free!)

2. **Upgrade to paid tier** ($7/month, no cold starts)

3. **Use keep-alive ping** (not recommended, wastes resources)

---

## Performance Issues

### Issue: App is slow/laggy

**Solutions:**

1. **Check network tab in browser DevTools**

2. **Reduce Pyodide load:**
- Only load when Python is selected
- Show loading indicator

3. **Optimize code synchronization:**
- Debounce code changes
- Send diffs instead of full code

---

### Issue: High memory usage

**Solutions:**

1. **Implement session cleanup:**
```javascript
if (session.users.length === 0) {
  setTimeout(() => {
    sessions.delete(sessionId);
  }, 3600000);  // 1 hour
}
```

2. **Limit session size:**
- Max users per session
- Max code length

---

## Browser Issues

### Issue: Works in Chrome but not Firefox/Safari

**Solutions:**

1. **Check browser console for specific errors**

2. **Verify browser compatibility:**
- WebSocket support
- ES6 module support

3. **Test in incognito mode** (disable extensions)

---

## General Debugging Tips

### Enable Verbose Logging

**Server:**
```javascript
socket.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.onAny((event, ...args) => {
    console.log('Event received:', event, args);
  });
});
```

**Client:**
```javascript
socket.onAny((event, ...args) => {
  console.log('Event received:', event, args);
});
```

### Check All Connections

```javascript
// Server
console.log('Active sessions:', sessions.size);
console.log('Connected clients:', io.engine.clientsCount);

// Client
console.log('Socket connected:', socket.connected);
console.log('Socket ID:', socket.id);
```

### Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Filter by WS (WebSocket)
4. Check connection status and messages

---

## Getting Help

If issues persist:

1. **Check browser console** for client errors
2. **Check server terminal** for server errors
3. **Review documentation** (README.md)
4. **Search GitHub issues** for similar problems
5. **Ask in course Slack/Discord**
6. **Create GitHub issue** with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

---

## Quick Health Check

Run these commands to verify everything is working:

```powershell
# 1. Check Node.js version
node --version  # Should be 18+

# 2. Check npm version
npm --version

# 3. Verify server health
curl http://localhost:3000/health

# 4. Check WebSocket connection
# Open browser console and look for "Connected" message

# 5. Run tests
npm test

# 6. Check Docker
docker --version
docker build -t test-build .
```

---

## Common Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| EADDRINUSE | Port in use | Kill process or use different port |
| ECONNREFUSED | Server not running | Start server first |
| Cannot find module | Missing dependency | Run npm install |
| WebSocket failed | Connection issue | Check CORS and firewall |
| Pyodide not loaded | CDN issue | Check internet connection |
| 404 Not Found | Wrong URL/route | Check API endpoints |
| CORS error | Origin not allowed | Update CORS settings |

---

**Still stuck?** Double-check that you followed the QUICKSTART.md guide step by step!
