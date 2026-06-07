// src/components/Sidebar.jsx
const TOPICS = [
  { id: 'General',          label: 'General',          icon: '🎯' },
  { id: 'Data Structures',  label: 'Data Structures',  icon: '🌳' },
  { id: 'Algorithms',       label: 'Algorithms',        icon: '⚡' },
  { id: 'Operating Systems',label: 'Operating Systems', icon: '💻' },
  { id: 'DBMS',             label: 'DBMS',              icon: '🗄️' },
  { id: 'Computer Networks',label: 'Computer Networks', icon: '🌐' },
  { id: 'COA',              label: 'COA',               icon: '🔧' },
  { id: 'TOC',              label: 'TOC',               icon: '🔄' },
  { id: 'Compiler Design',  label: 'Compiler Design',   icon: '📝' },
  { id: 'Digital Logic',    label: 'Digital Logic',     icon: '⚙️' },
  { id: 'Mathematics',      label: 'Discrete Maths',    icon: '📐' },
]

const MODES = [
  { id: 'normal',  label: 'Expert Mode', icon: '🎓', desc: 'Exam-focused answers' },
  { id: 'beginner',label: 'Beginner',    icon: '🌱', desc: 'Simple explanations'  },
  { id: 'quiz',    label: 'Quiz Mode',   icon: '📋', desc: 'Practice MCQs'        },
]

export default function Sidebar({ topic, setTopic, mode, setMode, onClear }) {
  return (
    <aside style={{
      width: 228, minWidth: 228, flexShrink: 0,
      background: 'var(--bg-surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      height: '100%', overflow: 'hidden',
      transition: 'background 0.25s',
    }}>
      {/* Brand */}
      <div style={{
        padding: '1.1rem 1rem 0.9rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.55rem',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: 'linear-gradient(135deg,#4285f4,#34a853)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.9rem',
        }}>🤖</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.88rem', letterSpacing: '-0.01em' }}>GATE AI</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Smart GATE CSE Tutor</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.65rem 0' }}>
        {/* Modes */}
        <Section label="Mode">
          {MODES.map(m => (
            <SideItem
              key={m.id} active={mode === m.id}
              onClick={() => setMode(m.id)}
              activeColor="#4285f4"
            >
              <span style={{ fontSize: '0.82rem' }}>{m.icon}</span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: mode === m.id ? 700 : 500, lineHeight: 1.2 }}>{m.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{m.desc}</div>
              </div>
            </SideItem>
          ))}
        </Section>

        {/* Topics */}
        <Section label="Topics">
          {TOPICS.map(t => (
            <SideItem
              key={t.id} active={topic === t.id}
              onClick={() => setTopic(t.id)}
              activeColor="#34a853"
            >
              <span style={{ fontSize: '0.78rem', width: 18, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
              <span style={{ fontSize: '0.81rem', fontWeight: topic === t.id ? 700 : 400 }}>{t.label}</span>
            </SideItem>
          ))}
        </Section>
      </div>

      {/* Footer */}
      <div style={{ padding: '0.65rem', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={onClear}
          style={{
            width: '100%', padding: '0.5rem',
            background: 'transparent', border: '1px solid var(--border)',
            borderRadius: '8px', color: 'var(--text-secondary)',
            cursor: 'pointer', fontSize: '0.8rem',
            fontFamily: 'var(--font-display)', transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#ea4335'; e.currentTarget.style.color='#ea4335' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)' }}
        >
          🗑️ Clear Chat
        </button>
      </div>
    </aside>
  )
}

function Section({ label, children }) {
  return (
    <div style={{ padding: '0 0.6rem', marginBottom: '0.75rem' }}>
      <div style={{
        fontSize: '0.62rem', color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: '0.35rem', paddingLeft: '0.2rem',
      }}>{label}</div>
      {children}
    </div>
  )
}

function SideItem({ active, onClick, activeColor, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.38rem 0.55rem', borderRadius: '7px', marginBottom: '2px',
        border: active ? `1px solid ${activeColor}33` : '1px solid transparent',
        background: active ? `${activeColor}14` : 'transparent',
        color: active ? activeColor : 'var(--text-secondary)',
        cursor: 'pointer', textAlign: 'left', transition: 'all 0.14s',
      }}
    >{children}</button>
  )
}
