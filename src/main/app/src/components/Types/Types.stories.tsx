import React from 'react'
import { Types } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|Types',
  component: Types,
}

export const Default: React.FC = () => {
  return (
    <Types
      types={['TEST', 'OTHER']}
      onSelect={action('onSelect')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
    />
  )
}
