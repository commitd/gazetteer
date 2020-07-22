import React from 'react'
import { TextInput } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|TextInput',
  component: TextInput,
}

export const Default: React.FC = () => {
  return (
    <TextInput
      text={'text'}
      label="test"
      helperText="Helper text"
      buttonLabel="Input"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
    />
  )
}
