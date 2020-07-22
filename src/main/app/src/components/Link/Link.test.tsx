import React from 'react'
import { Link } from '.'
import { render, renderDark } from '../../utils/test'

it('renders without error', () => {
  const { asFragment } = render(<Link to="/" />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Link to="/" />)
  expect(asFragment()).toMatchSnapshot()
})
it('Can get by text', () => {
  const { getByText } = render(<Link to="/">Test</Link>)
  getByText(/Test/i)
})

it('Can get by role', () => {
  const { getByRole } = render(<Link to="/">Test</Link>)
  getByRole('link', { name: 'Test' })
})
