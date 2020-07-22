import {
  Box,
  Column,
  Container,
  Divider,
  Flex,
  FlexProps,
  Grid,
  Heading,
  Link,
  LinkProps,
  Logo,
  styled,
  Typography,
  useTheme,
} from '@committed/components'
import React from 'react'
import ghLight from '../../images/GitHub-Mark-64px.png'
import ghDark from '../../images/GitHub-Mark-Light-64px.png'

/**
 * Light and dark swap for image.
 */
const Icon: React.StatelessComponent<{
  /**
   * the icon for light mode
   */
  readonly light: string
  /**
   * the icon for dark mode
   */
  readonly dark: string
  /**
   * the alt text
   */
  readonly alt: string
  /**
   * the width
   */
  readonly width?: number
  /**
   * children not supported
   */
  readonly children?: undefined
}> = ({ light, dark, alt, width = 64 }) => {
  const theme = useTheme()
  const version = theme.palette.type === 'light' ? light : dark
  return (
    <Column
      width={`${width}px`}
      height={`${width}px`}
      justifyContent="center"
      my={1}
    >
      <img width={`${width}px`} src={version} alt={alt} />
    </Column>
  )
}

/**
 * A column in the footer
 */
const FooterColumn: React.FC<
  {
    /** heading of the column */
    readonly heading?: string
    /** Column contents */
    readonly children: React.ReactNode
  } & FlexProps
> = ({ heading, children, ...props }) => (
  <Flex p={1} {...props}>
    {heading !== undefined ? <Heading.h1>{heading}</Heading.h1> : null}
    {children}
  </Flex>
)

/**
 * A column in the footer
 */
const FooterLink = styled((props: LinkProps<'a'>) => (
  <Link variant="clear" target="_blank" {...props} />
))({
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
  },
})

/**
 * Common formatting fo the links shown
 *
 */
const ExternalLink: React.FC<{
  /**
   * the href of the link
   */
  readonly href: string
  /**
   * The image/logo associated to the link
   */
  readonly image: React.ReactNode
  /**
   * Contents/text for the link
   */
  readonly children: React.ReactNode
}> = ({ href, image, children }) => (
  <FooterLink href={href}>
    <Flex width={'180px'} alignItems="center">
      <Typography fontWeight={700} fontSize={2} flexGrow="1">
        {children}
      </Typography>
      {image}
    </Flex>
  </FooterLink>
)

/**
 * Footer for the application.
 */
export const Footer: React.FC = () => (
  <footer>
    <Box width={1} bgcolor="background.default">
      <Divider my={3} mx={2} />
      <Container maxWidth="lg">
        <Grid
          gridTemplateColumns={{
            sm: 'minmax(300px, 1fr)',
            md: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
          gridGap={2}
        >
          <FooterColumn heading="">
            <Typography component="p">
              Licensed under the{' '}
              <FooterLink href="http://www.apache.org/licenses/LICENSE-2.0">
                Apache License, Version 2.0
              </FooterLink>
            </Typography>
          </FooterColumn>
          <FooterColumn justifyContent={{ sm: 'center', md: 'flex-end' }}>
            <Flex alignItems="center">
              <Typography>Developed by</Typography>
              <Box display="inline-block" px={1}>
                <Logo size={16} />
              </Box>
              <Typography>
                <FooterLink href="https://committed.software/">
                  Committed
                </FooterLink>
              </Typography>
            </Flex>
          </FooterColumn>
          <FooterColumn justifyContent={{ sm: 'flex-start', md: 'flex-end' }}>
            <ExternalLink
              href="https://github.com/commitd"
              image={<Icon light={ghLight} dark={ghDark} alt="GitHub" />}
            >
              GitHub
            </ExternalLink>
          </FooterColumn>
        </Grid>
      </Container>
    </Box>
  </footer>
)
