import React from 'react'
import { ConfirmDialog } from '.'
import { Button } from '@committed/components'
import { action } from '@storybook/addon-actions'
import { useToggle } from '../../hooks'

export default {
  title: 'Components|ConfirmDialog',
  component: ConfirmDialog,
}

export const Default: React.FC = () => {
  const [open, toggleOpen] = useToggle(false)

  return (
    <>
      <Button onClick={toggleOpen}>Open Dialog</Button>
      <ConfirmDialog
        open={open}
        title="Do you confirm?"
        onClose={toggleOpen}
        onConfirm={action('Confirm')}
      />
    </>
  )
}
