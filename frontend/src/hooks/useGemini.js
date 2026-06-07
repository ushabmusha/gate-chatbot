import { useState, useCallback } from 'react'

export function useGemini() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (messages, topic, mode) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages,
          topic,
          mode
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || `Server Error ${res.status}`)
        setIsLoading(false)
        return null
      }

      setIsLoading(false)
      return data.text
    } catch (err) {
      console.error(err)
      setError('Cannot reach backend server')
      setIsLoading(false)
      return null
    }
  }, [])

  return {
    sendMessage,
    isLoading,
    error,
    setError
  }
}