import React, { ReactNode } from 'react'
import { Container } from '@committed/components'

export interface PageProps {
  /**
   * Contents of the page
   */
  readonly children?: ReactNode
}

/**
 * Page component wraps the main content.
 *
 * <p> This is abstracted so easy to change all at once should the design be updated.
 */
export const Page: React.FC<PageProps> = ({ children, ...props }) => (
  <Container maxWidth="lg" {...props}>
    {children}
  </Container>
)
