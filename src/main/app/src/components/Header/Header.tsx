import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Container,
  Heading,
  IconProps,
  Icons,
  MenuItem,
  MenuList,
  Popover,
  styled,
  ThemeSwitch,
  Toolbar,
} from '@committed/components'
import { useScrollTrigger } from '@material-ui/core'
import React, { MouseEvent, useState } from 'react'
import { Link } from '../Link'

/**
 * Props for both Toolbar and Main actions
 */
export interface ActionProps {
  /**
   * Callback for on click handler
   */
  readonly onClick: () => void
  /**
   * Optional Icon to display
   */
  readonly icon?: React.ReactElement<IconProps>
  /**
   * Set true to disable the action
   */
  readonly disabled?: boolean
  /**
   * Optional aria  to add to the props
   */
  readonly 'aria-label'?: string
  /**
   * Optional title to add to the button
   */
  readonly title?: string
  /**
   * The string to show for the action
   */
  readonly children?: string
}

export interface SelectProps {
  /**
   * Callback for on click handler, provides the selected index
   */
  readonly onClick: (index: number) => void
  /**
   * Selected item index
   */
  readonly selectedIndex: number
  /**
   *  The options to choose from (first selected by default)
   */
  readonly options: string[]
  /**
   *  Placeholder to show if nothing selected
   */
  readonly placeholder?: string
  /**
   * Children not supported
   */
  readonly children?: undefined
}

/**
 * Use this component for the main action on the page
 * This is rendered in the main app bar instead of the toolbar
 */
export const MainAction: React.FC<ActionProps> = ({
  onClick,
  disabled = false,
  icon = null,
  ...props
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    color="primary"
    startIcon={icon}
    {...props}
  />
)

/**
 * Use this component for the toolbar actions
 */
export const ToolbarAction: React.FC<ActionProps> = ({
  onClick,
  disabled = false,
  icon = null,
  ...props
}) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    variant="text"
    size="small"
    startIcon={icon}
    mx={1}
    {...props}
  />
)

/**
 * Use this component for the toolbar selects
 */
export const ToolbarSelect: React.FC<SelectProps> = ({
  placeholder = 'Select',
  selectedIndex,
  onClick,
  options = [],
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleMenuItemClick = (index: number): void => {
    onClick(index)
    handleClose()
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const selected = (): string => {
    return selectedIndex >= 0 ? options[Number(selectedIndex)] : placeholder
  }

  return (
    <>
      <Button
        variant="text"
        size="small"
        aria-owns={open ? 'menu-list' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<Icons.ArrowDropDown />}
        {...props}
      >
        {selected()}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disablePortal
      >
        <Box bgcolor="background.paper" id="menu-list">
          <MenuList>
            {options.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === selectedIndex}
                onClick={(): void => handleMenuItemClick(index)}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Popover>
    </>
  )
}

export interface HeaderProps {
  /**
   * The position defaults to sticky, so the header stays at the top of the view.
   * This can be set to `relative` to support it's display out of the normal position in the help.
   */
  position?: 'sticky' | 'relative'
  /**
   * Children
   */
  readonly children?: {
    /**
     * Supply an action to be displayed in the app bar.
     * Expects an element of type MainAction
     */
    main?: React.ReactElement<ActionProps>
    /**
     * The list of actions that can be performed from the toolbar.
     * Expects an array containing ToolbarAction and ToolbarSelect elements only
     */
    tools?: Array<React.ReactElement<ActionProps | SelectProps>>
    errors?: string[]
  }
}

// internal props
interface AppToolbarProps {
  readonly height: string
  readonly children?: React.ReactNode
}

const AppToolbar = styled(({ height, ...other }: AppToolbarProps) => (
  <Toolbar {...other} />
))({
  height: ({ height }: AppToolbarProps) => height,
  minHeight: ({ height }: AppToolbarProps) => height,
})

type HeaderAppBarProps = AppBarProps & { margin: string }

const HeaderAppBar = styled(({ margin, ...other }: HeaderAppBarProps) => (
  <AppBar {...other} />
))({
  marginTop: ({ margin }: HeaderAppBarProps) => margin,
})

const MessageAppBar = styled(HeaderAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
}))

const HeaderBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

/**
 * Header for the application.
 *
 * The header takes the main navigation actions and the particular actions that can be performed on the current page.
 * The main action is displayed in the main app bar. Secondary actions are displayed in a toolbar.
 */
export const Header: React.FC<HeaderProps> = ({
  position = 'sticky',
  children = {},
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const elevation = trigger ? 4 : 0

  const { main, tools = [], errors = [] } = children

  return (
    <>
      <HeaderBar
        elevation={tools.length > 0 ? 0 : elevation}
        position={position}
      >
        <Container maxWidth="lg">
          <AppToolbar height="64px">
            <Box flexGrow={1}>
              <Link to="/">
                <Button variant="text">
                  <Icons.GpsFixed />
                  <Heading.h1>&nbsp;Gazetteer</Heading.h1>
                </Button>
              </Link>
            </Box>
            {main}
            <ThemeSwitch lightColor="action.active" darkColor="action.active" />
          </AppToolbar>
        </Container>
      </HeaderBar>
      {tools.length > 0 ? (
        <Box height="32px">
          <HeaderAppBar
            margin={position === 'sticky' ? '64px' : '0'}
            elevation={errors.length > 0 ? 0 : elevation}
            position={position === 'sticky' ? 'fixed' : 'relative'}
            color="default"
          >
            <Container maxWidth="lg">
              <AppToolbar height="32px">
                <Box flexGrow={1} />
                {tools}
              </AppToolbar>
            </Container>
          </HeaderAppBar>
        </Box>
      ) : null}
      {errors.length > 0 ? (
        <Box height="54px">
          <MessageAppBar margin="96px" elevation={elevation} position="fixed">
            <Container maxWidth="lg">
              {/* Just showing first error */}
              errors[0]
            </Container>
          </MessageAppBar>
        </Box>
      ) : null}
    </>
  )
}
