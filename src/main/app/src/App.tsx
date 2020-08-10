import { Column, Grid, ThemeProvider } from '@committed/components'
import React from 'react'
import { SWRConfig } from 'swr'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Routes } from './Routes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetcher = async <T extends any>(url: string): Promise<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,  @typescript-eslint/promise-function-async
  fetch(url).then((r) => r.json())

export const App: React.FC = () => (
  <ThemeProvider>
    <SWRConfig value={{ fetcher }}>
      <Grid minHeight="100vh" gridTemplateRows="1fr auto">
        <Column>
          <Header />
          <Routes />
        </Column>
        <Footer />
      </Grid>
    </SWRConfig>
  </ThemeProvider>
)
