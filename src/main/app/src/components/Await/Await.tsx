import React from 'react'
import { FullError } from '../FullError'
import { Loader, LoaderProps } from '@committed/components'

export interface AwaitProps extends LoaderProps {
  condition: boolean
  error?: Error
  children: React.ReactNode
}

/**
 * Await component
 */
export const Await: React.FC<AwaitProps> = ({
  condition,
  error,
  children,
  ...props
}: AwaitProps) => {
  if (error !== undefined) {
    return <FullError error={error} />
  }

  if (condition) {
    return <>{children}</>
  }

  return <Loader {...props} />
}
