import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Footer } from '.'

it('renders without error', () => {
  const { asFragment } = render(<Footer />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Footer />)
  expect(asFragment()).toMatchSnapshot()
})
it('Contains Credit and License sections', () => {
  const { getAllByText } = render(<Footer />)

  expect(getAllByText(/by/i).length).toBeGreaterThan(0)
  expect(getAllByText(/License/i).length).toBeGreaterThan(0)
})

it('Contains link text', () => {
  const { getAllByText } = render(<Footer />)

  expect(getAllByText(/GitHub/i).length).toBeGreaterThan(0)
})
