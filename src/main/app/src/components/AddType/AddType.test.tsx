import React from 'react'
import { render, renderDark } from '../../utils/test'
import { AddType } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <AddType open={true} close={jest.fn()} onAdd={jest.fn()} />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <AddType open={true} close={jest.fn()} onAdd={jest.fn()} />
  )
  expect(asFragment()).toMatchSnapshot()
})
