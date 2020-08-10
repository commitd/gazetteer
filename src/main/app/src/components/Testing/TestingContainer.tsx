import React, { useState } from 'react'
import { Testing } from '.'
import { Match } from '../../types/server-types'

/**
 * Testing container
 */
export const TestingContainer: React.FC = () => {
  const [text, setText] = useState('')
  const [test, setTest] = useState<string>('')
  const [results, setResults] = useState<Match[] | undefined>([])

  async function sendText(text: string): Promise<void> {
    if (text === undefined || text.trim() === '') {
      return
    }
    await fetch('/api/v1/gazetteer', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: text,
    })
      .then((r): Match[] => (r.json() as unknown) as Match[])
      .then(setResults)
  }

  async function handleSubmit(): Promise<void> {
    setResults(undefined)
    setTest(text)
    await sendText(text)
  }

  return (
    <Testing
      text={text}
      setText={setText}
      onSubmit={handleSubmit}
      test={test}
      results={results}
    />
  )
}
