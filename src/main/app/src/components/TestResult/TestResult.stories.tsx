import React from 'react'
import { TestResult } from '.'

export default {
  title: 'Components|TestResult',
  component: TestResult,
}

export const Default: React.FC = () => {
  return (
    <TestResult
      text="this is a test"
      results={[
        {
          length: 4,
          value: 'test',
          type: 'TEST',
          offset: 10,
        },
      ]}
    />
  )
}
