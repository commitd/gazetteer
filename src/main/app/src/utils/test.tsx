import { StylesProvider } from '@material-ui/styles'
import {
  createHistory,
  createMemorySource,
  History,
  LocationProvider,
} from '@reach/router'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GenerateId } from 'jss'
import React from 'react'
import { ThemeProvider } from '@committed/components'

const generateClassName: GenerateId = (rule, styleSheet) => {
  const prefix =
    styleSheet === undefined || styleSheet.options.classNamePrefix === undefined
      ? ''
      : styleSheet.options.classNamePrefix
  return `${prefix}-${rule.key}`
}

const LightTheme: React.FC<{ readonly children?: React.ReactNode }> = ({
  children,
}) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="light">{children}</ThemeProvider>
  </StylesProvider>
)

const DarkTheme: React.FC<{ readonly children?: React.ReactNode }> = ({
  children,
}) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider choice="dark">{children}</ThemeProvider>
  </StylesProvider>
)

export const renderPlain = render

export const renderLight = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: LightTheme, ...options })

export const renderDark = (
  ui: Readonly<React.ReactElement>,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: DarkTheme, ...options })

export function renderWithRouter(
  ui: Readonly<React.ReactElement>,
  route = '/',
  options?: Omit<RenderOptions, 'queries'>,
  delegate = renderLight
): RenderResult & { history: History } {
  const history = createHistory(createMemorySource(route))
  return {
    ...delegate(
      <LocationProvider history={history}>{ui}</LocationProvider>,
      options
    ),
    history,
  }
}
// re-export everything
export * from '@testing-library/react'
// override render method
export { renderLight as render }
export { userEvent }
