// src/components/ThemeToggle.jsx
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      onClick={onToggle}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '0.3rem 0.7rem',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-display)',
        fontSize: '0.75rem',
        fontWeight: 600,
        transition: 'all 0.2s',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-blue)'
        e.currentTarget.style.color = 'var(--accent-blue)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-secondary)'
      }}
    >
      {/* Track */}
      <span style={{
        position: 'relative',
        display: 'inline-flex',
        width: 34, height: 18,
        background: isDark ? '#333' : '#d0d8e4',
        borderRadius: 20,
        transition: 'background 0.25s',
        flexShrink: 0,
      }}>
        {/* Knob */}
        <span style={{
          position: 'absolute',
          top: 2, left: isDark ? 2 : 16,
          width: 14, height: 14,
          borderRadius: '50%',
          background: isDark ? '#4285f4' : '#fbbc04',
          transition: 'left 0.25s, background 0.25s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '8px',
        }}>
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
      <span style={{ fontSize: '0.72rem' }}>
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
