import React, { useState } from 'react';

function Home({ onConnect, initialSessionId, serverUrl }) {
  const [username, setUsername] = useState('');
  const [sessionId, setSessionId] = useState(initialSessionId || '');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSession = async () => {
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch(`${serverUrl}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data = await response.json();
      onConnect(data.sessionId, username);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinSession = async () => {
    if (!username.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!sessionId.trim()) {
      alert('Please enter a session ID');
      return;
    }

    try {
      // Verify session exists
      const response = await fetch(`${serverUrl}/api/sessions/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Session not found');
      }

      onConnect(sessionId, username);
    } catch (error) {
      console.error('Error joining session:', error);
      alert('Session not found. Please check the session ID.');
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}?session=${sessionId}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="home">
      <div className="home-container">
        <h1>🚀 Collaborative Coding</h1>
        
        <div className="home-form">
          <div className="form-group">
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (sessionId ? handleJoinSession() : handleCreateSession())}
            />
          </div>

          <button 
            className="button-primary"
            onClick={handleCreateSession}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create New Session'}
          </button>

          <div className="divider">OR</div>

          <div className="form-group">
            <label htmlFor="sessionId">Session ID</label>
            <input
              id="sessionId"
              type="text"
              placeholder="Enter session ID to join"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoinSession()}
            />
          </div>

          <button 
            className="button-secondary"
            onClick={handleJoinSession}
          >
            Join Session
          </button>

          {sessionId && (
            <button 
              className="button-secondary"
              onClick={handleCopyLink}
            >
              📋 Copy Session Link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
