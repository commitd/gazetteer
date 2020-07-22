import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Types } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <Types
      types={['TEST', 'OTHER']}
      onSelect={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <Types
      types={['TEST', 'OTHER']}
      onSelect={jest.fn()}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
