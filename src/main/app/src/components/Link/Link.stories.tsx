import { Button } from '@committed/components'
import React from 'react'
import { Link } from '.'

export default {
  title: 'Components|Link',
  component: Link,
}

export const Default: React.FC = () => {
  return <Link to="/">No underline</Link>
}

export const OnButton: React.FC = () => {
  return (
    <Link to="/">
      <Button>No underline</Button>
    </Link>
  )
}
