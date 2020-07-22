import React from 'react'
import { renderPlain } from './utils/test'
import { App } from './App'

test('renders without error', () => {
  renderPlain(<App />)
})
