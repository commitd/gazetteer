import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Header } from '../components/Header'
import { NotFound as Contents } from '../components/NotFound'
import { Page } from '../components/Page'

export const NotFound: React.FC<RouteComponentProps> = () => (
  <>
    <Header />
    <Page data-testid="NotFound">
      <Contents />
    </Page>
  </>
)
