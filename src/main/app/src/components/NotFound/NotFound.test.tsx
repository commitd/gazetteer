import React from 'react'
import { render, renderDark } from '../../utils/test'
import { NotFound } from '.'

it('renders without error', () => {
  const { asFragment } = render(<NotFound />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<NotFound />)
  expect(asFragment()).toMatchSnapshot()
})

it('Can find main action to navigate home', () => {
  const { getByRole } = render(<NotFound />)

  expect(getByRole('link', { name: /Return Home/i })).toHaveAttribute(
    'href',
    '/'
  )
})
