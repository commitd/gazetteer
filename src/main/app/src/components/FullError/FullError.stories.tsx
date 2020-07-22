import React from 'react'
import { FullError } from '.'

export default {
  title: 'Components|FullError',
  component: FullError,
}

export const Default: React.FC = () => {
  return <FullError error={new Error('Error message')} />
}
