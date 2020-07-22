import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Page } from '../components/Page'
import { Typography, Heading } from '@committed/components'
import { KeywordsContainer } from '../components/Keywords/KeywordsContainer'

export interface TypeProps extends RouteComponentProps {
  type?: string
}

export const Type: React.FC<TypeProps> = ({ type, navigate }) => {
  if (type === undefined) {
    return null
  }

  return (
    <Page data-testid="Type">
      <Heading.h1>{type}</Heading.h1>
      <Typography>
        The list of keywords for this type and the find count is shown below.
      </Typography>
      <KeywordsContainer type={type} navigate={navigate} />
    </Page>
  )
}
