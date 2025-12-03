import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

function CodeEditor({ socket, sessionId, username, onDisconnect }) {
  const [code, setCode] = useState('// Write your code here\n');
  const [language, setLanguage] = useState('javascript');
  const [users, setUsers] = useState([]);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const pyodideRef = useRef(null);
  const isLocalChange = useRef(false);

  useEffect(() => {
    if (!socket) return;

    // Receive initial session state
    socket.on('session-state', ({ code: initialCode, language: initialLanguage, users: initialUsers }) => {
      setCode(initialCode);
      setLanguage(initialLanguage);
      setUsers(initialUsers);
    });

    // Receive code updates from other users
    socket.on('code-update', ({ code: newCode }) => {
      setCode(newCode);
    });

    // Receive language updates
    socket.on('language-update', ({ language: newLanguage }) => {
      setLanguage(newLanguage);
    });

    // Handle user joined
    socket.on('user-joined', (user) => {
      setUsers((prev) => [...prev, user]);
      setOutput((prev) => prev + `\n👋 ${user.username} joined the session`);
    });

    // Handle user left
    socket.on('user-left', (user) => {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setOutput((prev) => prev + `\n👋 ${user.username} left the session`);
    });

    return () => {
      socket.off('session-state');
      socket.off('code-update');
      socket.off('language-update');
      socket.off('user-joined');
      socket.off('user-left');
    };
  }, [socket]);

  // Load Pyodide for Python execution
  useEffect(() => {
    if (language === 'python' && !pyodideRef.current) {
      loadPyodide();
    }
  }, [language]);

  const loadPyodide = async () => {
    try {
      setOutput('Loading Python environment...');
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
      });
      pyodideRef.current = pyodide;
      setOutput('Python environment ready!');
    } catch (error) {
      console.error('Error loading Pyodide:', error);
      setOutput('Error loading Python environment: ' + error.message);
    }
  };

  const handleCodeChange = (value) => {
    isLocalChange.current = true;
    setCode(value);
    
    // Emit code change to server
    socket.emit('code-change', {
      sessionId,
      code: value
    });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    
    // Emit language change to server
    socket.emit('language-change', {
      sessionId,
      language: newLanguage
    });
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'python':
        return python();
      case 'javascript':
      default:
        return javascript();
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      if (language === 'javascript') {
        await runJavaScript();
      } else if (language === 'python') {
        await runPython();
      }
    } catch (error) {
      setOutput((prev) => prev + `\n❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runJavaScript = async () => {
    try {
      // Create a safe execution context
      const logs = [];
      const customConsole = {
        log: (...args) => logs.push(args.join(' ')),
        error: (...args) => logs.push('Error: ' + args.join(' ')),
        warn: (...args) => logs.push('Warning: ' + args.join(' ')),
      };

      // Execute the code
      const func = new Function('console', code);
      func(customConsole);

      setOutput('✅ Output:\n' + (logs.length > 0 ? logs.join('\n') : '(no output)'));
    } catch (error) {
      setOutput('❌ Error:\n' + error.message);
    }
  };

  const runPython = async () => {
    if (!pyodideRef.current) {
      setOutput('Python environment not ready. Please wait...');
      await loadPyodide();
      if (!pyodideRef.current) {
        setOutput('❌ Failed to load Python environment');
        return;
      }
    }

    try {
      // Redirect Python stdout to capture output
      pyodideRef.current.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      // Run the user's code
      await pyodideRef.current.runPythonAsync(code);

      // Get the output
      const stdout = pyodideRef.current.runPython('sys.stdout.getvalue()');
      
      setOutput('✅ Output:\n' + (stdout || '(no output)'));
    } catch (error) {
      setOutput('❌ Error:\n' + error.message);
    }
  };

  const handleCopySessionLink = () => {
    const link = `${window.location.origin}?session=${sessionId}`;
    navigator.clipboard.writeText(link);
    alert('Session link copied to clipboard!');
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <div className="editor-header-left">
          <div className="editor-title">Collaborative Coding Session</div>
          <div className="session-info">
            Session: {sessionId.slice(0, 8)}...
          </div>
        </div>
        
        <div className="editor-header-right">
          <div className="users-list">
            <span style={{ fontSize: '12px', color: '#888' }}>👥 Online:</span>
            {users.map((user) => (
              <span key={user.id} className="user-badge">
                {user.username}
              </span>
            ))}
          </div>
          
          <select 
            className="language-selector"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>

          <button className="button-secondary" onClick={handleCopySessionLink}>
            📋 Copy Link
          </button>
          
          <button className="button-disconnect" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="code-panel">
          <div className="panel-header">
            <span className="panel-title">Code Editor</span>
          </div>
          <CodeMirror
            value={code}
            height="100%"
            theme={oneDark}
            extensions={[getLanguageExtension()]}
            onChange={handleCodeChange}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightSpecialChars: true,
              foldGutter: true,
              drawSelection: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              rectangularSelection: true,
              crosshairCursor: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              closeBracketsKeymap: true,
              searchKeymap: true,
              foldKeymap: true,
              completionKeymap: true,
              lintKeymap: true,
            }}
          />
        </div>

        <div className="output-panel">
          <div className="panel-header">
            <span className="panel-title">Output</span>
            <button 
              className="button-run" 
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? '⏳ Running...' : '▶️ Run Code'}
            </button>
          </div>
          <div className="output-content">
            {output ? (
              <pre>{output}</pre>
            ) : (
              <div className="output-empty">
                Click "Run Code" to see output here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
