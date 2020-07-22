// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { styled } from '@committed/components'
import { Link as ReachLink } from '@reach/router'

/**
 * Simple wrapper of reach-router Link to remove styling
 */
export const Link = styled(ReachLink)({
  textDecoration: 'none',
})
