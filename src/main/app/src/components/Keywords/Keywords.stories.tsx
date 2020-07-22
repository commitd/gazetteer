import React from 'react'
import { Keywords } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|Keywords',
  component: Keywords,
}

export const Default: React.FC = () => {
  return (
    <Keywords
      type="test"
      keywords={{ test1: 3, 'this is a test': 19 }}
      onDelete={action('delete')}
      onAdd={action('add')}
    />
  )
}
