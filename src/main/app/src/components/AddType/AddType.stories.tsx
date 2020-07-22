import React from 'react'
import { AddType } from '.'
import { useToggle } from '../../hooks/useToggle'
import { Button } from '@committed/components'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|AddType',
  component: AddType,
}

export const Default: React.FC = () => {
  const [show, toggle] = useToggle(false)
  return (
    <>
      <Button onClick={toggle}>Show Dialog</Button>
      <AddType open={show} close={toggle} onAdd={action('add')} />
    </>
  )
}
