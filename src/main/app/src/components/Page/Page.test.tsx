import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Page } from '.'

it('renders without error', () => {
  const { asFragment } = render(<Page>Contents</Page>)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Page>Content</Page>)
  expect(asFragment()).toMatchSnapshot()
})
