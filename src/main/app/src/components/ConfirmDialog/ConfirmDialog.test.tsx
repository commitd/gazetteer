import React from 'react'
import { Button } from '@committed/components'
import { render, renderDark, userEvent } from '../../utils/test'
import { ConfirmDialog } from '.'
import { useToggle } from '../../hooks'

it('renders without error', () => {
  const { asFragment } = render(
    <ConfirmDialog
      open={true}
      onConfirm={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('renders dark without error', () => {
  const { asFragment } = renderDark(
    <ConfirmDialog
      open={true}
      onConfirm={(): void => undefined}
      onClose={(): void => undefined}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

const CanConfirm: React.FC<{ title: string; onConfirm: () => void }> = ({
  title,
  onConfirm,
}) => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open</Button>
      <ConfirmDialog
        open={open}
        title={title}
        onClose={toggleOpen}
        onConfirm={onConfirm}
      />
    </>
  )
}

it('can be cancelled', () => {
  const title = 'Do you confirm?'
  const onConfirm = jest.fn()
  const { getByText, getByRole } = render(
    <CanConfirm title={title} onConfirm={onConfirm} />
  )

  userEvent.click(getByRole('button', { name: /Open/i }))
  getByText(title)
  userEvent.click(getByRole('button', { name: /Cancel/i }))
  expect(onConfirm).not.toHaveBeenCalled()
})

it('can confirm', () => {
  const title = 'Do you confirm?'
  const onConfirm = jest.fn()
  const { getByText, getByRole } = render(
    <CanConfirm title={title} onConfirm={onConfirm} />
  )

  userEvent.click(getByRole('button', { name: /Open/i }))
  getByText(title)
  userEvent.click(getByRole('button', { name: /Confirm/i }))
  expect(onConfirm).toHaveBeenCalled()
})
