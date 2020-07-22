import { RouteComponentProps } from '@reach/router'
import React from 'react'
import { Page } from '../components/Page'
import { Typography, Heading } from '@committed/components'
import { TypesContainer } from '../components/Types/TypesContainer'
import { TestingContainer } from '../components/Testing/TestingContainer'

export const Home: React.FC<RouteComponentProps> = ({ navigate }) => (
  <Page data-testid="Home">
    <TypesContainer navigate={navigate} />
    <Heading.h1>Test</Heading.h1>
    <Typography>Test the gazetteer using the text box below</Typography>
    <TestingContainer />
  </Page>
)
