import React, { useEffect, useState } from 'react'
import { Testing } from '.'
import { Match } from '../../types/server-types'

/**
 * Testing container
 */
export const TestingContainer: React.FC = () => {
  const [text, setText] = useState('')
  const [test, setTest] = useState<string>('')
  const [results, setResults] = useState<Match[] | undefined>([])

  function handleSubmit(): void {
    setTest(text)
  }

  useEffect(() => {
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
    setResults(undefined)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sendText(test)
  }, [test, setResults])

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
