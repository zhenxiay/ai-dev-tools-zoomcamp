import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { io as Client } from 'socket.io-client';
import { startServer, closeServer } from './server.js';

// Use different port for testing to avoid conflicts
const TEST_PORT = process.env.TEST_PORT || 3001;
const SERVER_URL = `http://localhost:${TEST_PORT}`;

describe('Server Integration Tests', () => {
  let server;

  beforeAll(async () => {
    // Set test port
    process.env.PORT = TEST_PORT;
    process.env.NODE_ENV = 'test';
    
    server = await startServer();
    // Wait for server to be ready
    await new Promise(resolve => setTimeout(resolve, 1500));
  });

  afterAll(async () => {
    await closeServer();
    // Wait for cleanup
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  it('should respond to health check', async () => {
    const response = await fetch(`${SERVER_URL}/health`);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('status', 'ok');
  });

  it('should create a new session', async () => {
    const response = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('sessionId');
    expect(typeof data.sessionId).toBe('string');
  });

  it('should get session information', async () => {
    // First create a session
    const createResponse = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const { sessionId } = await createResponse.json();
    
    // Then get session info
    const response = await fetch(`${SERVER_URL}/api/sessions/${sessionId}`);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', sessionId);
    expect(data).toHaveProperty('code');
    expect(data).toHaveProperty('language');
    expect(data).toHaveProperty('users');
  });

  it('should return 404 for non-existent session', async () => {
    const response = await fetch(`${SERVER_URL}/api/sessions/non-existent-id`);
    
    expect(response.status).toBe(404);
  });

  it('should handle WebSocket connection and session join', async () => {
    // Create a session first
    const createResponse = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const { sessionId } = await createResponse.json();
    
    return new Promise((resolve, reject) => {
      const client = Client(SERVER_URL);
      
      client.on('connect', () => {
        client.emit('join-session', { sessionId, username: 'TestUser' });
      });
      
      client.on('session-state', (data) => {
        expect(data).toHaveProperty('code');
        expect(data).toHaveProperty('language');
        expect(data).toHaveProperty('users');
        client.disconnect();
        resolve();
      });
      
      client.on('error', (error) => {
        client.disconnect();
        reject(error);
      });
      
      setTimeout(() => {
        client.disconnect();
        reject(new Error('Timeout'));
      }, 5000);
    });
  });

  it('should synchronize code changes between users', async () => {
    // Create a session
    const createResponse = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const { sessionId } = await createResponse.json();
    
    return new Promise((resolve, reject) => {
      const client1 = Client(SERVER_URL);
      const client2 = Client(SERVER_URL);
      
      let client1Connected = false;
      let client2Connected = false;
      
      const testCode = '// Test code from client 1';
      
      client1.on('connect', () => {
        client1.emit('join-session', { sessionId, username: 'User1' });
      });
      
      client1.on('session-state', () => {
        client1Connected = true;
        if (client2Connected) {
          // Both connected, now send code change
          client1.emit('code-change', { sessionId, code: testCode });
        }
      });
      
      client2.on('connect', () => {
        client2.emit('join-session', { sessionId, username: 'User2' });
      });
      
      client2.on('session-state', () => {
        client2Connected = true;
        if (client1Connected) {
          // Both connected, now send code change
          client1.emit('code-change', { sessionId, code: testCode });
        }
      });
      
      client2.on('code-update', (data) => {
        expect(data.code).toBe(testCode);
        client1.disconnect();
        client2.disconnect();
        resolve();
      });
      
      setTimeout(() => {
        client1.disconnect();
        client2.disconnect();
        reject(new Error('Timeout'));
      }, 5000);
    });
  });

  it('should broadcast language changes to all users', async () => {
    // Create a session
    const createResponse = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const { sessionId } = await createResponse.json();
    
    return new Promise((resolve, reject) => {
      const client1 = Client(SERVER_URL);
      const client2 = Client(SERVER_URL);
      
      let client1Connected = false;
      let client2Connected = false;
      
      client1.on('connect', () => {
        client1.emit('join-session', { sessionId, username: 'User1' });
      });
      
      client1.on('session-state', () => {
        client1Connected = true;
        if (client2Connected) {
          client1.emit('language-change', { sessionId, language: 'python' });
        }
      });
      
      client2.on('connect', () => {
        client2.emit('join-session', { sessionId, username: 'User2' });
      });
      
      client2.on('session-state', () => {
        client2Connected = true;
        if (client1Connected) {
          client1.emit('language-change', { sessionId, language: 'python' });
        }
      });
      
      client2.on('language-update', (data) => {
        expect(data.language).toBe('python');
        client1.disconnect();
        client2.disconnect();
        resolve();
      });
      
      setTimeout(() => {
        client1.disconnect();
        client2.disconnect();
        reject(new Error('Timeout'));
      }, 5000);
    });
  });
});
