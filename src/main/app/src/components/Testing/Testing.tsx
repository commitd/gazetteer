import React from 'react'
import { Match } from '../../types/server-types'
import { TextInput } from '../TextInput'
import { TestResult } from '../TestResult'
import { Await } from '../Await'
import { Box } from '@committed/components'

export interface TestingProps {
  text: string
  setText: (text: string) => void
  onSubmit: () => void
  test: string
  results: Match[] | undefined
}

/**
 * Testing component
 */
export const Testing: React.FC<TestingProps> = ({
  text,
  setText,
  onSubmit,
  test,
  results,
}: TestingProps) => (
  <>
    <TextInput
      text={text}
      label={'Test gazetteer'}
      buttonLabel={'Send'}
      helperText={'Input text to send to the gazetteer'}
      onChange={setText}
      onSubmit={onSubmit}
    />
    <Box py={3}>
      <Await condition={results !== undefined}>
        <TestResult text={test} results={results ?? []} />
      </Await>
    </Box>
  </>
)
