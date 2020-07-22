import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Testing } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <Testing
      text={'text'}
      setText={jest.fn()}
      onSubmit={jest.fn()}
      test={'This is a test'}
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
    <Testing
      text={'text'}
      setText={jest.fn()}
      onSubmit={jest.fn()}
      test={'This is a test'}
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
