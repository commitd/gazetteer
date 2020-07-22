import React from 'react'
import { render, renderDark } from '../../utils/test'
import { TextInput } from '.'

it('renders without error', () => {
  const { asFragment } = render(
    <TextInput
      text={'text'}
      label="test"
      helperText="Helper text"
      buttonLabel="Input"
      onChange={jest.fn()}
      onSubmit={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <TextInput
      text={'text'}
      label="test"
      helperText="Helper text"
      buttonLabel="Input"
      onChange={jest.fn()}
      onSubmit={jest.fn()}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
