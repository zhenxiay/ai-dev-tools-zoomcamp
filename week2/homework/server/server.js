import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Store active sessions
const sessions = new Map();

// Create a new session
app.post('/api/sessions', (req, res) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    id: sessionId,
    code: '// Write your code here\n',
    language: 'javascript',
    users: [],
    createdAt: new Date()
  });
  
  res.json({ sessionId });
});

// Get session info
app.get('/api/sessions/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json(session);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', sessions: sessions.size });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Join a session
  socket.on('join-session', ({ sessionId, username }) => {
    const session = sessions.get(sessionId);
    
    if (!session) {
      socket.emit('error', { message: 'Session not found' });
      return;
    }
    
    socket.join(sessionId);
    socket.sessionId = sessionId;
    socket.username = username || `User-${socket.id.slice(0, 4)}`;
    
    // Add user to session
    session.users.push({
      id: socket.id,
      username: socket.username
    });
    
    // Send current session state to the joining user
    socket.emit('session-state', {
      code: session.code,
      language: session.language,
      users: session.users
    });
    
    // Notify others about new user
    socket.to(sessionId).emit('user-joined', {
      id: socket.id,
      username: socket.username
    });
    
    console.log(`${socket.username} joined session ${sessionId}`);
  });
  
  // Handle code changes
  socket.on('code-change', ({ sessionId, code }) => {
    const session = sessions.get(sessionId);
    
    if (session) {
      session.code = code;
      // Broadcast to all other users in the session
      socket.to(sessionId).emit('code-update', { code });
    }
  });
  
  // Handle language changes
  socket.on('language-change', ({ sessionId, language }) => {
    const session = sessions.get(sessionId);
    
    if (session) {
      session.language = language;
      // Broadcast to all users in the session
      io.to(sessionId).emit('language-update', { language });
    }
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    
    if (socket.sessionId) {
      const session = sessions.get(socket.sessionId);
      
      if (session) {
        // Remove user from session
        session.users = session.users.filter(u => u.id !== socket.id);
        
        // Notify others about user leaving
        socket.to(socket.sessionId).emit('user-left', {
          id: socket.id,
          username: socket.username
        });
        
        // Clean up empty sessions after 1 hour
        if (session.users.length === 0) {
          setTimeout(() => {
            const currentSession = sessions.get(socket.sessionId);
            if (currentSession && currentSession.users.length === 0) {
              sessions.delete(socket.sessionId);
              console.log(`Session ${socket.sessionId} cleaned up`);
            }
          }, 3600000); // 1 hour
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

export const startServer = () => {
  return httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

export const closeServer = () => {
  return new Promise((resolve) => {
    httpServer.close(resolve);
  });
};

export { app, io, httpServer };

// Start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  startServer();
}
