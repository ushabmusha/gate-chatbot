import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 3001
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

console.log('==========================')
console.log('PORT:', PORT)
console.log('GEMINI_API_KEY STARTS WITH:', GEMINI_API_KEY?.substring(0, 15))
console.log('KEY LOADED:', !!GEMINI_API_KEY)
console.log('==========================')

app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasKey: !!GEMINI_API_KEY,
    model: 'gemini-2.5-flash'
  })
})

function buildSystemPrompt(topic, mode) {
  const topicCtx =
    topic && topic !== 'General'
      ? `The user is studying ${topic}.`
      : 'Cover any GATE CSE topic.'

  const modeCtx = {
    beginner: `
Explain in very simple language.

Rules:
- Use simple words.
- Use short examples.
- Keep answer under 250 words.
- Avoid huge theory.
`,

    quiz: `
Generate exactly 5 GATE CSE MCQs.

STRICT FORMAT:

# Question 1

Question text

A) Option A
B) Option B
C) Option C
D) Option D

✅ Answer: A

📝 Explanation:
Maximum 2 short lines.

---

# Question 2

Same format.

---

# Question 3

Same format.

---

# Question 4

Same format.

---

# Question 5

Same format.

Rules:
- No long paragraphs.
- No detailed theory.
- No explanation longer than 2 lines.
- Keep total response under 500 words.
- Medium to hard GATE level.
- Mix theory, numericals and concepts.
`,

    normal: `
Provide exam-oriented answers.

Rules:
- Direct answer first.
- Use bullet points.
- Use headings.
- Keep answer under 300 words.
- Avoid unnecessary theory.
- Highlight important GATE points.
`
  }[mode] || ''

  return `
You are an expert GATE CSE preparation assistant.

${topicCtx}

${modeCtx}

General Rules:
- Be concise.
- Focus on GATE preparation.
- Avoid very long responses.
- Use markdown formatting.
`
}

app.post('/api/chat', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY missing'
      })
    }

    const { messages, topic, mode } = req.body

    const userMessage =
      messages?.[messages.length - 1]?.content || 'Hello'

    const prompt = `
${buildSystemPrompt(topic, mode)}

User Question:
${userMessage}
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
        GEMINI_API_KEY
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          generationConfig: {
            temperature: mode === 'quiz' ? 0.5 : 0.7,
            maxOutputTokens: mode === 'quiz' ? 700 : 900,
            topP: 0.9,
            topK: 20
          },
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
  console.log('GEMINI ERROR FULL:')
  console.log(JSON.stringify(data, null, 2))

  const fallbackText =
    mode === 'quiz'
      ? `
# GATE Quiz

## Question 1
What is DBMS?

A) Database Management System
B) Data Backup Management System
C) Database Memory System
D) Data Management Server

✅ Answer: A

---

## Question 2
Which SQL command retrieves data?

A) INSERT
B) UPDATE
C) SELECT
D) DELETE

✅ Answer: C

---

## Question 3
Which normal form removes partial dependency?

A) 1NF
B) 2NF
C) 3NF
D) BCNF

✅ Answer: B

---

## Question 4
Which key uniquely identifies a row?

A) Foreign Key
B) Candidate Key
C) Primary Key
D) Alternate Key

✅ Answer: C

---

## Question 5
DDL stands for?

A) Data Definition Language
B) Data Design Language
C) Data Development Language
D) Database Definition Logic

✅ Answer: A
`
      : `
# GATE CSE Assistant

## GATE Exam Pattern

- Total Marks: 100
- General Aptitude: 15
- Core Subjects: 85
- Duration: 3 Hours

## Important Subjects

- Data Structures
- Algorithms
- Operating Systems
- DBMS
- Computer Networks
- TOC

## Tips

- Practice PYQs
- Revise daily
- Take mock tests

Good luck for GATE!
`

  return res.json({
    text: fallbackText
  })
}

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response generated.'

    res.json({ text })
  } catch (error) {
    console.error('SERVER ERROR:', error)

    res.status(500).json({
      error: error.message
    })
  }
})

app.listen(PORT, () => {
  console.log(
    `✅ GATE Chatbot backend running on http://localhost:${PORT}`
  )
})