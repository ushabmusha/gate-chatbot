// src/components/ChatInput.jsx
import { useState, useRef, useEffect } from 'react'

const QUICK = {
  General:           ['Explain GATE exam pattern', 'Highest weightage topics in GATE CSE', 'How to score 70+ in GATE CSE'],
  'Data Structures': ['Explain AVL trees', 'Heap vs BST comparison', 'Time complexity of hash table'],
  Algorithms:        ['Explain Dijkstra step by step', 'DP vs Greedy — when to use which?', 'What is NP-completeness?'],
  'Operating Systems':['Deadlock Coffman conditions', 'Process vs Thread', 'Page replacement algorithms'],
  DBMS:              ['Explain all normal forms', 'ACID properties', 'B+ tree vs B tree'],
  'Computer Networks':['OSI vs TCP/IP model', 'TCP 3-way handshake', 'Distance vector vs link state'],
  COA:               ['Pipeline hazards', 'Cache mapping techniques', 'RISC vs CISC'],
  TOC:               ['NFA to DFA conversion', 'Pumping lemma', 'CFG examples'],
  'Compiler Design': ['Phases of a compiler', 'LL(1) vs LR(1) parsing', 'First and Follow sets'],
  'Digital Logic':   ['K-map simplification', 'Flip-flop types compared', 'Combinational vs sequential'],
  Mathematics:       ['Graph theory for GATE', 'Propositional logic basics', 'Counting and probability tips'],
}

export default function ChatInput({ onSend, isLoading, topic, mode }) {
  const [text, setText] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = Math.min(ref.current.scrollHeight, 140) + 'px'
    }
  }, [text])

  const send = () => {
    if (!text.trim() || isLoading) return
    onSend(text.trim())
    setText('')
    if (ref.current) ref.current.style.height = 'auto'
  }

  const prompts = QUICK[topic] || QUICK['General']

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-surface)',
      padding: '0.65rem 1rem 0.85rem',
      transition: 'background 0.25s',
    }}>
      {/* Quick prompts */}
      <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
        {mode === 'quiz' && (
          <Chip
            label={`📋 Quiz on ${topic}`}
            color="#fbbc04"
            onClick={() => onSend(`Give me 5 MCQs on ${topic === 'General' ? 'mixed GATE CSE topics' : topic}`)}
            disabled={isLoading}
          />
        )}
        {prompts.map((p, i) => (
          <Chip key={i} label={p} onClick={() => onSend(p)} disabled={isLoading} />
        ))}
      </div>

      {/* Input row */}
      <div
        style={{
          display: 'flex', gap: '0.45rem', alignItems: 'flex-end',
          background: 'var(--bg-input)', border: '1px solid var(--border-bright)',
          borderRadius: '12px', padding: '0.45rem 0.45rem 0.45rem 0.9rem',
          transition: 'border-color 0.2s, background 0.25s',
        }}
        onFocusCapture={e => e.currentTarget.style.borderColor = '#4285f4'}
        onBlurCapture={e =>  e.currentTarget.style.borderColor = 'var(--border-bright)'}
      >
        <textarea
          ref={ref} rows={1} value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
          placeholder={mode === 'quiz' ? `Ask for a quiz on ${topic}...` : `Ask about ${topic}... (Shift+Enter = newline)`}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-primary)', fontFamily: 'var(--font-display)',
            fontSize: '0.9rem', resize: 'none', lineHeight: 1.5,
          }}
        />
        <button
          onClick={send}
          disabled={!text.trim() || isLoading}
          style={{
            width: 36, height: 36, flexShrink: 0, borderRadius: 8, border: 'none',
            background: text.trim() && !isLoading ? 'linear-gradient(135deg,#4285f4,#34a853)' : 'var(--bg-elevated)',
            cursor: text.trim() && !isLoading ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', transition: 'all 0.2s', color: '#fff',
          }}
        >
          {isLoading
            ? <span style={{ width:15, height:15, border:'2px solid #4285f4', borderTopColor:'transparent', borderRadius:'50%', display:'block', animation:'spin 0.7s linear infinite' }} />
            : '↑'}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '0.35rem', fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        GDG Hackathon · GATE CSE AI · Powered by Google Gemini 2.0 Flash
      </div>
    </div>
  )
}

function Chip({ label, onClick, disabled, color }) {
  return (
    <button
      onClick={onClick} disabled={disabled}
      style={{
        flexShrink: 0, padding: '0.28rem 0.65rem',
        background: color ? `${color}14` : 'var(--bg-elevated)',
        border: `1px solid ${color ? color + '44' : 'var(--border)'}`,
        borderRadius: '20px', color: color || 'var(--text-secondary)',
        fontSize: '0.73rem', cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'var(--font-display)', transition: 'all 0.14s', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { if (!disabled && !color) { e.target.style.borderColor='#4285f4'; e.target.style.color='#4285f4' } }}
      onMouseLeave={e => { if (!color) { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--text-secondary)' } }}
    >{label}</button>
  )
}
