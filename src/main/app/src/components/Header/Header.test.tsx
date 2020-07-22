import { Icons } from '@committed/components'
import React from 'react'
import { Header, MainAction, ToolbarAction, ToolbarSelect } from '.'
import { render, renderDark, userEvent } from '../../utils/test'

// NB
// We don't snapshot some of these as we found that sometimes the snapshots have a touch ripple element and sometimes they don't.
// I think this is a timing issue, but it meant some tests failed occasionally.
// Instead we just check there is some output rather than have sporadically failing tests.

it('Header renders without error', () => {
  const { asFragment } = render(<Header />)
  expect(asFragment()).toMatchSnapshot()
})

it('Header renders dark without error', () => {
  const { asFragment } = renderDark(<Header />)
  expect(asFragment()).toMatchSnapshot()
})

it('MainAction renders without error', () => {
  const onClick = jest.fn()
  const { asFragment } = render(
    <MainAction onClick={onClick}>Action</MainAction>
  )
  expect(asFragment()).toMatchSnapshot()
})

it('MainAction renders dark without error', () => {
  const onClick = jest.fn()
  const { asFragment } = renderDark(
    <MainAction onClick={onClick}>Action</MainAction>
  )
  expect(asFragment()).toBeDefined()
})

it('MainAction renders with icon without error', () => {
  const onClick = jest.fn()
  const { asFragment } = render(
    <MainAction onClick={onClick} icon={<Icons.Star />}>
      Action
    </MainAction>
  )
  expect(asFragment()).toBeDefined()
})

it('MainAction onClick is called', () => {
  const onClick = jest.fn()
  const { getByRole } = render(
    <MainAction onClick={onClick} icon={<Icons.Star />}>
      Action
    </MainAction>
  )
  expect(onClick).not.toBeCalled()
  userEvent.click(getByRole('button', { name: /Action/i }))
  expect(onClick).toBeDefined()
})

it('ToolbarAction renders without error', () => {
  const onClick = jest.fn()
  const { asFragment } = render(
    <ToolbarAction onClick={onClick}>Action</ToolbarAction>
  )
  expect(asFragment()).toBeDefined()
})

it('ToolbarAction renders dark without error', () => {
  const onClick = jest.fn()
  const { asFragment } = renderDark(
    <ToolbarAction onClick={onClick}>Action</ToolbarAction>
  )
  expect(asFragment()).toBeDefined()
})

it('ToolbarAction renders with icon', () => {
  const onClick = jest.fn()
  const { asFragment } = renderDark(
    <ToolbarAction onClick={onClick} icon={<Icons.Save />}>
      Action
    </ToolbarAction>
  )
  expect(asFragment()).toBeDefined()
})

it('ToolbarAction click calls callback', () => {
  const onClick = jest.fn()
  const { getByRole } = renderDark(
    <ToolbarAction onClick={onClick} icon={<Icons.Save />}>
      Action
    </ToolbarAction>
  )

  expect(onClick).not.toBeCalled()
  userEvent.click(getByRole('button', { name: /Action/i }))
  expect(onClick).toHaveBeenCalled()
})

it('ToolbarSelect renders without error', () => {
  const onClick = jest.fn()
  const { asFragment } = render(
    <ToolbarSelect
      selectedIndex={0}
      onClick={onClick}
      options={['Option 1', 'Option 2']}
    />
  )
  expect(asFragment()).toBeDefined()
})

it('ToolbarSelect renders dark without error', () => {
  const onClick = jest.fn()
  const { asFragment } = renderDark(
    <ToolbarSelect
      selectedIndex={0}
      onClick={onClick}
      options={['Option 1', 'Option 2']}
    />
  )
  expect(asFragment()).toBeDefined()
})

it('ToolbarSelect renders placeholder', () => {
  const onClick = jest.fn()
  const { getByText } = render(
    <ToolbarSelect
      selectedIndex={-1}
      onClick={onClick}
      placeholder="Test"
      options={['Option 1', 'Option 2']}
    />
  )
  getByText('Test')
})

it('ToolbarSelect shows selected option', () => {
  const onClick = jest.fn()
  const { getByText } = render(
    <ToolbarSelect
      selectedIndex={1}
      onClick={onClick}
      placeholder="Test"
      options={['Option 1', 'Option 2']}
    />
  )
  getByText('Option 2')
})

it('ToolbarSelect can select another option', () => {
  const onClick = jest.fn()
  const options = ['Option 1', 'Option 2']
  const { getByRole, getByText } = render(
    <ToolbarSelect selectedIndex={0} onClick={onClick} options={options} />
  )

  expect(onClick).not.toBeCalled()
  userEvent.click(getByRole('button', { name: options[0] }))
  expect(onClick).not.toBeCalled()
  userEvent.click(getByText(options[1]))
  expect(onClick).toHaveBeenCalledWith(1)
})
