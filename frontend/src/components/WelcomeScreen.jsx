// src/components/WelcomeScreen.jsx
const FEATURES = [
  { icon: '🎓', title: 'Expert Mode',   desc: 'Precise GATE-level answers with formulas & keywords' },
  { icon: '🌱', title: 'Beginner Mode', desc: 'Simple analogies, no jargon, step-by-step' },
  { icon: '📋', title: 'Quiz Mode',     desc: 'Auto-generated MCQs with GATE difficulty' },
  { icon: '📚', title: '10+ Subjects',  desc: 'DS, OS, DBMS, CN, COA, TOC and more' },
]

const EXAMPLES = {
  normal:  ['Explain the difference between process and thread', 'What is normalisation in DBMS?', 'How does TCP handle congestion?'],
  beginner:['Explain recursion like I am 10 years old', 'What is an OS in simple terms?', 'What is a database in everyday language?'],
  quiz:    ['Give me 5 MCQs on Data Structures', 'Quiz me on OS scheduling algorithms', 'Test my knowledge of Computer Networks'],
}

export default function WelcomeScreen({ topic, mode, onPrompt }) {
  const prompts = EXAMPLES[mode] || EXAMPLES.normal

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', flex: 1, padding: '2rem 1.5rem', textAlign: 'center',
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 16, marginBottom: '1.1rem',
        background: 'linear-gradient(135deg,#4285f4,#34a853)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.7rem', boxShadow: '0 0 40px rgba(66,133,244,0.25)',
      }}>🤖</div>

      <h2 style={{
        fontSize: '1.55rem', fontWeight: 800, letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        marginBottom: '0.35rem',
      }}>GATE AI Assistant</h2>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '1.75rem', maxWidth: 360, lineHeight: 1.6 }}>
        Your intelligent study partner for GATE CSE. Ask anything — explanations, formulas, or take a quiz.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.55rem', maxWidth: 480, width: '100%', marginBottom: '1.75rem' }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '0.7rem', textAlign: 'left',
            transition: 'background 0.25s',
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.1rem' }}>{f.title}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          Try asking
        </div>
        {prompts.map((p, i) => (
          <button key={i} onClick={() => onPrompt(p)} style={{
            width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '0.55rem 0.85rem', color: 'var(--text-secondary)',
            textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-display)',
            fontSize: '0.82rem', transition: 'all 0.14s', display: 'flex', gap: '0.5rem',
            alignItems: 'center', marginBottom: '0.35rem',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#4285f4'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.background='rgba(66,133,244,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.background='var(--bg-elevated)' }}
          >
            <span style={{ color: 'var(--text-muted)' }}>→</span>{p}
          </button>
        ))}
      </div>
    </div>
  )
}
