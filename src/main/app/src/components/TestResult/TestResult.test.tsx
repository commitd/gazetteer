import React from 'react'
import { render, renderDark } from '../../utils/test'
import { TestResult } from '.'

it('renders without error', () => {
  const { asFragment } = render(
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
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
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
  expect(asFragment()).toMatchSnapshot()
})
