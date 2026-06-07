// src/App.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar       from './components/Sidebar'
import ChatMessage, { TypingIndicator } from './components/ChatMessage'
import ChatInput     from './components/ChatInput'
import WelcomeScreen from './components/WelcomeScreen'
import ThemeToggle   from './components/ThemeToggle'
import { useGemini } from './hooks/useGemini'

export default function App() {
  const [theme, setTheme]           = useState(() => localStorage.getItem('theme') || 'dark')
  const [messages, setMessages]     = useState([])
  const [streaming, setStreaming]   = useState('')
  const [topic, setTopic]           = useState('General')
  const [mode, setMode]             = useState('normal')
  const endRef                       = useRef(null)
  const { sendMessage, isLoading, error, setError } = useGemini()

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const handleSend = useCallback(async (text) => {
    if (isLoading) return
    const userMsg = { role: 'user', content: text, timestamp: Date.now(), id: crypto.randomUUID() }
    const history = [...messages, userMsg]
    setMessages(history)
    setStreaming('')
    setError(null)

    const result = await sendMessage(history, topic, mode, chunk => {
      setStreaming(prev => prev + chunk)
    })

    setStreaming('')
    if (result) {
      setMessages(prev => [...prev, {
        role: 'assistant', content: result,
        timestamp: Date.now(), id: crypto.randomUUID()
      }])
    }
  }, [isLoading, messages, topic, mode, sendMessage, setError])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-base)' }}>
      <Sidebar topic={topic} setTopic={setTopic} mode={mode} setMode={setMode} onClear={() => { setMessages([]); setStreaming('') }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <header style={{
          padding: '0.65rem 1.1rem', borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, transition: 'background 0.25s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Badge color="#34a853">{topic}</Badge>
            <Badge color={mode === 'quiz' ? '#fbbc04' : mode === 'beginner' ? '#34a853' : '#4285f4'} subtle>
              {mode === 'quiz' ? '📋 Quiz' : mode === 'beginner' ? '🌱 Beginner' : '🎓 Expert'}
            </Badge>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1rem 1.1rem',
          display: 'flex', flexDirection: 'column', gap: '0.2rem',
        }}>
          {messages.length === 0 && !streaming
            ? <WelcomeScreen topic={topic} mode={mode} onPrompt={handleSend} />
            : <>
                {messages.map((m, i) => (
                  <ChatMessage key={m.id} message={m} isNew={i === messages.length - 1} />
                ))}
                {streaming && (
                  <ChatMessage
                    key="streaming"
                    message={{ role: 'assistant', content: streaming, timestamp: Date.now(), id: 'streaming' }}
                    isNew
                  />
                )}
                {isLoading && !streaming && <TypingIndicator />}
              </>
          }

          {error && (
            <div style={{
              background: 'rgba(234,67,53,0.1)', border: '1px solid rgba(234,67,53,0.3)',
              borderRadius: '10px', padding: '0.7rem 1rem', fontSize: '0.83rem',
              color: '#ea4335', display: 'flex', alignItems: 'center', gap: '0.5rem',
              animation: 'fadeIn 0.3s ease', margin: '0.5rem 0',
            }}>
              <span>⚠️</span><span style={{ flex: 1 }}>{error}</span>
              <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#ea4335', cursor: 'pointer', fontSize: '1rem' }}>×</button>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <ChatInput onSend={handleSend} isLoading={isLoading} topic={topic} mode={mode} />
      </div>
    </div>
  )
}

function Badge({ children, color, subtle }) {
  return (
    <div style={{
      padding: '0.28rem 0.6rem',
      background: subtle ? 'var(--bg-elevated)' : `${color}18`,
      border: `1px solid ${subtle ? 'var(--border)' : color + '40'}`,
      borderRadius: '20px', fontSize: '0.73rem',
      color: subtle ? 'var(--text-secondary)' : color,
      fontWeight: subtle ? 500 : 700, display: 'flex', alignItems: 'center', gap: '0.3rem',
    }}>
      {!subtle && <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block' }} />}
      {children}
    </div>
  )
}
