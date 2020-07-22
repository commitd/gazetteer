import { Column, Grid, ThemeProvider } from '@committed/components'
import React from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Routes } from './Routes'

export const App: React.FC = () => (
  <ThemeProvider>
    <Grid minHeight="100vh" gridTemplateRows="1fr auto">
      <Column>
        <Header />
        <Routes />
      </Column>
      <Footer />
    </Grid>
  </ThemeProvider>
)
