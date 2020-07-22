import { Button, Column, Display, Paragraph } from '@committed/components'
import React from 'react'
import { ErrorLogo } from '../ErrorLogo'
import { Link } from '../Link'

/**
 * NotFound component shows the 404 message and allows the user to return home
 */
export const NotFound: React.FC = () => (
  <Column p={4} alignItems="center">
    <ErrorLogo />
    <Display.d1>404</Display.d1>
    <Paragraph>Page could not be found</Paragraph>
    <Link to="/">
      <Button size="large" color="primary">
        Return Home
      </Button>
    </Link>
  </Column>
)
