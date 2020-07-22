import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Keywords } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <Keywords
      type="test"
      keywords={{ test1: 3, 'this is a test': 19 }}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <Keywords
      type="test"
      keywords={{ test1: 3, 'this is a test': 19 }}
      onDelete={jest.fn()}
      onAdd={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
