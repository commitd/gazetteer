import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { KeywordsContainer } from '../components/Keywords/KeywordsContainer'
import { Page } from '../components/Page'

export interface TypeProps extends RouteComponentProps {
  typeId?: string
}

export const Type: React.FC<TypeProps> = ({ typeId, navigate }) => {
  if (typeId === undefined) {
    return null
  }

  return (
    <Page data-testid="Type">
      <KeywordsContainer typeId={typeId} navigate={navigate} />
    </Page>
  )
}
