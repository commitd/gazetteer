import React from 'react'
import { Column, Display, Loader } from '@committed/components'

/**
 * Full page Loading component
 */
export const Loading: React.FC = () => (
  <Column alignItems="center">
    <Loader size={256} />
    <Display.d1>Loading...</Display.d1>
  </Column>
)
