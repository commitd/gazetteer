import React from 'react'
import { Logo, styled } from '@committed/components'

/**
 * ErrorLogo component
 */
export const ErrorLogo: React.ComponentType = styled(Logo)(({ theme }) => ({
  '& .commit_logo': {
    stroke: theme.palette.error.light,
    fill: theme.palette.error.light,
  },
}))
