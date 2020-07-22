import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Loading } from '.'

it('renders without error', () => {
  const { asFragment } = render(<Loading />)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Loading />)
  expect(asFragment()).toMatchSnapshot()
})
