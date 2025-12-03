import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Home from './components/Home';
import CodeEditor from './components/CodeEditor';
import './App.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

function App() {
  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get session ID from URL if exists
    const urlParams = new URLSearchParams(window.location.search);
    const sessionFromUrl = urlParams.get('session');
    if (sessionFromUrl) {
      setSessionId(sessionFromUrl);
    }
  }, []);

  const connectToSession = (session, user) => {
    const newSocket = io(SERVER_URL);
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join-session', { sessionId: session, username: user });
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message);
    });

    setSocket(newSocket);
    setSessionId(session);
    setUsername(user);

    // Update URL
    window.history.pushState({}, '', `?session=${session}`);
  };

  const disconnectFromSession = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    setSessionId(null);
    setIsConnected(false);
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="app">
      {!isConnected ? (
        <Home 
          onConnect={connectToSession}
          initialSessionId={sessionId}
          serverUrl={SERVER_URL}
        />
      ) : (
        <CodeEditor 
          socket={socket}
          sessionId={sessionId}
          username={username}
          onDisconnect={disconnectFromSession}
        />
      )}
    </div>
  );
}

export default App;
