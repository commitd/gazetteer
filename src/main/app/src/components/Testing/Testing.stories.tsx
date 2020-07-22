import React from 'react'
import { Testing } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components|Testing',
  component: Testing,
}

export const Default: React.FC = () => {
  return (
    <Testing
      text={'text'}
      setText={action('setText')}
      onSubmit={action('onSubmit')}
      test={'This is a test'}
      results={[
        {
          length: 4,
          value: 'test',
          type: 'TEST',
          offset: 10,
        },
      ]}
    />
  )
}

export const Working: React.FC = () => {
  return (
    <Testing
      text={'text'}
      setText={action('setText')}
      onSubmit={action('onSubmit')}
      test={'This is a test'}
      results={undefined}
    />
  )
}
