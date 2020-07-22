import { Box, Icons } from '@committed/components'
import { action } from '@storybook/addon-actions'
import React from 'react'
import { Header, MainAction, ToolbarAction, ToolbarSelect } from '.'

export default {
  title: 'Components|Header',
  component: Header,
}

export const Default: React.FC = () => <Header />

export const WithScroll: React.FC = () => (
  <>
    <Header />
    <div style={{ minHeight: '100vh' }}>
      <div style={{ minHeight: '200vh' }} />
    </div>
  </>
)

export const WithMainAction: React.FC = () => (
  <Header>
    {{ main: <MainAction onClick={action('main')}>Action</MainAction> }}
  </Header>
)

export const WithTools: React.FC = () => (
  <Header>
    {{
      tools: [
        <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
        <ToolbarSelect
          onClick={action('Selected')}
          selectedIndex={0}
          options={['Option 1', 'Options 2', 'Option 3']}
        />,
      ],
    }}
  </Header>
)

export const WithMainAndTools: React.FC = () => (
  <Header>
    {{
      main: <MainAction onClick={action('main')}>Action</MainAction>,
      tools: [
        <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
        <ToolbarAction onClick={action('Icon')} icon={<Icons.Save />}>
          Icon
        </ToolbarAction>,
      ],
    }}
  </Header>
)

export const WithMainAndToolsWithScroll: React.FC = () => (
  <>
    <Header>
      {{
        main: (
          <MainAction onClick={action('main')} icon={<Icons.Star />}>
            Action
          </MainAction>
        ),
        tools: [
          <ToolbarAction onClick={action('Tool')}>Tool</ToolbarAction>,
          <ToolbarAction onClick={action('Icon')} icon={<Icons.Save />}>
            Icon
          </ToolbarAction>,
        ],
      }}
    </Header>
    <Box bgcolor="background.default" style={{ minHeight: '100vh' }}>
      <div style={{ minHeight: '200vh' }} />
    </Box>
  </>
)
