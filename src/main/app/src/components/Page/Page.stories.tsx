import React from 'react'
import { Page } from '.'

export default {
  title: 'Components|Page',
  component: Page,
}

export const Default: React.FC = () => {
  return <Page />
}

export const WithContents: React.FC = () => {
  return <Page>With Contents</Page>
}
