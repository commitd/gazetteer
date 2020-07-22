import { Router } from '@reach/router'
import React from 'react'
import { NotFound, Home, Type } from './pages'

export const Routes: React.FC = () => (
  <Router>
    <NotFound default />
    <Home path="/" />
    <Type path="types/:type" />
  </Router>
)
