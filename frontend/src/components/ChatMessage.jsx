// src/components/ChatMessage.jsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatMessage({ message, isNew }) {
  const isUser = message.role === 'user'
  return (
    <div style={{
      display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row',
      gap: '0.7rem', padding: '0.2rem 0', alignItems: 'flex-start',
      animation: isNew ? 'fadeIn 0.28s ease' : 'none',
    }}>
      {/* Avatar */}
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', marginTop: 2,
        background: isUser
          ? 'linear-gradient(135deg,#4285f4,#a855f7)'
          : 'linear-gradient(135deg,#34a853,#4285f4)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {isUser ? '👤' : '🎓'}
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: 'min(680px, 80%)',
        background: isUser ? 'var(--user-bubble-bg)' : 'var(--bot-bubble-bg)',
        border: isUser ? '1px solid var(--user-bubble-border)' : '1px solid var(--bot-bubble-border)',
        borderRadius: isUser ? '14px 3px 14px 14px' : '3px 14px 14px 14px',
        padding: '0.7rem 0.95rem',
        boxShadow: 'var(--shadow)',
        transition: 'background 0.25s, border-color 0.25s',
      }}>
        <div className="md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
        <div style={{
          fontSize: '0.62rem', color: 'var(--text-muted)', marginTop: '0.35rem',
          textAlign: isUser ? 'right' : 'left', fontFamily: 'var(--font-mono)',
        }}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div style={{
      display: 'flex',
      gap: '0.7rem',
      alignItems: 'flex-start',
      padding: '0.2rem 0',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        width: 30,
        height: 30,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg,#34a853,#4285f4)',
        fontSize: '0.85rem',
      }}>
        🎓
      </div>

      <div style={{
        background: 'var(--bot-bubble-bg)',
        border: '1px solid var(--bot-bubble-border)',
        borderRadius: '3px 14px 14px 14px',
        padding: '0.8rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: 'var(--shadow)',
      }}>
        {[0, 1, 2].map(i => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#4285f4',
              display: 'block',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        <span style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          fontWeight: 500,
        }}>
          Generating answer...
        </span>
      </div>
    </div>
  )
}