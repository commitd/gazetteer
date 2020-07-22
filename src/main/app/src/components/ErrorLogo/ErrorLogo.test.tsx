import React from 'react'
import { render, renderDark } from '../../utils/test'
import { ErrorLogo } from '.'

it('renders without error', () => {
  const { asFragment } = render(<ErrorLogo />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<ErrorLogo />)
  expect(asFragment()).toMatchSnapshot()
})
