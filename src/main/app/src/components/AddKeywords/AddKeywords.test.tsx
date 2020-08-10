import React from 'react'
import { render, renderDark } from '../../utils/test'
import { AddKeywords } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <AddKeywords
      open={true}
      type={'Test'}
      close={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <AddKeywords
      open={true}
      type={'Test'}
      close={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
