import React from 'react'
import { render, renderDark } from '../../utils/test'
import { FullError } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <FullError error={new Error('Error message')} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <FullError error={new Error('Error message')} />
  )
  expect(asFragment()).toMatchSnapshot()
})
