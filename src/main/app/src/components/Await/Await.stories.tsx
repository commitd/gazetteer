import React from 'react'
import { Await } from '.'

export default {
  title: 'Components|Await',
  component: Await,
}

export const Default: React.FC = () => {
  return <Await condition={false}>Test</Await>
}

export const WithError: React.FC = () => {
  return (
    <Await condition={false} error={Error('test')}>
      Test
    </Await>
  )
}

export const Awaited: React.FC = () => {
  return <Await condition>Test</Await>
}
