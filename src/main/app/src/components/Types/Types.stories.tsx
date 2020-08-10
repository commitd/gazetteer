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
      types={[
        {
          id: 'TEST',
          value: 'test',
          ignoreCase: true,
          ignoreOverlaps: false,
          onlyWholeWords: true,
          onlyWholeWordsWhiteSpaceSeparated: false,
        },
        {
          id: 'OTHER',
          value: 'other',
          ignoreCase: false,
          ignoreOverlaps: true,
          onlyWholeWords: false,
          onlyWholeWordsWhiteSpaceSeparated: true,
        },
      ]}
      onSelect={action('onSelect')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onUpdate={action('onUpdate')}
    />
  )
}

export const NoTypes: React.FC = () => {
  return (
    <Types
      types={[]}
      onSelect={action('onSelect')}
      onDelete={action('onDelete')}
      onAdd={action('onAdd')}
      onUpdate={action('onUpdate')}
    />
  )
}
