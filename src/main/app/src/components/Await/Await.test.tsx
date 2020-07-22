import React from 'react'
import { render, renderDark } from '../../utils/test'
import { Await } from '.'

it('renders without error', () => {
  const { asFragment } = render(<Await condition>TEST</Await>)
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(<Await condition>TEST</Await>)
  expect(asFragment()).toMatchSnapshot()
})

it('renders when error', () => {
  const { asFragment } = render(
    <Await condition={false} error={new Error()}>
      TEST
    </Await>
  )
  expect(asFragment()).toMatchSnapshot()
  expect(asFragment()).not.toContain('TEST')
})

it('renders loading', () => {
  const { asFragment } = render(<Await condition={false}>TEST</Await>)
  expect(asFragment()).not.toContain('TEST')
})
