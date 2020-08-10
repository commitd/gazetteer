import React from 'react'
import { ErrorLogo } from '../ErrorLogo/ErrorLogo'
import { Box, Button, Column, Display, Monospace } from '@committed/components'

export interface FullErrorProps {
  /**
   * The error to be displayed
   */
  readonly error?: Error
  /**
   * Action to perform on click
   */
  readonly action?: () => void
  /**
   * Children not supported
   */
  readonly children?: undefined
}

/**
 * Full page display of Error
 *
 * Designed for use when the error is not recoverable and a reload is required.
 */
export const FullError: React.FC<FullErrorProps> = ({
  error,
  action = (): void => window.location.reload(),
}) => (
  <Column height="100%" alignItems="center">
    <ErrorLogo />
    <Display.d1>Error</Display.d1>
    {error !== undefined && (
      <Box color="error.main">
        <Monospace wrap>
          {error.message === undefined ? 'Unknown Error' : error.message}
        </Monospace>
      </Box>
    )}
    <Button mb={5} size="large" color="primary" onClick={action}>
      Reload
    </Button>
  </Column>
)
