import React from 'react'
import { AddKeywords } from '.'
import { useToggle } from '../../hooks/useToggle'
import { Button } from '@committed/components'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|AddKeywords',
  component: AddKeywords,
}

export const Default: React.FC = () => {
  const [show, toggle] = useToggle(false)
  return (
    <>
      <Button onClick={toggle}>Show Dialog</Button>
      <AddKeywords
        open={show}
        type={'Test'}
        close={toggle}
        onAdd={action('add')}
      />
    </>
  )
}
