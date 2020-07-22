import {
  Button,
  Card,
  Column,
  Heading,
  IconButton,
  Icons,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Row,
  Typography,
} from '@committed/components'
import React from 'react'
import { useDialog } from '../../hooks/useDialog'
import { AddType } from '../AddType'
import { ConfirmDialog } from '../ConfirmDialog'

export interface BaseProps {
  onSelect: (type: string) => void
  onDelete: (type: string) => void
}

export interface TypeProps extends BaseProps {
  type: string
}

export interface TypesProps extends BaseProps {
  types: string[]
  onAdd: (type: string, values: string) => void
}

export const Type: React.FC<TypeProps> = ({
  type,
  onSelect,
  onDelete,
}: TypeProps) => {
  const [show, open, close] = useDialog()

  return (
    <>
      <ListItem button onClick={(): void => onSelect(type)}>
        <ListItemText primary={type} />
        <ListItemSecondaryAction onClick={open}>
          <IconButton edge="end" aria-label="comments">
            <Icons.Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmDialog
        open={show}
        onClose={close}
        title={`Delete all keywords for type ${type}?`}
        onConfirm={(): void => onDelete(type)}
      />
    </>
  )
}

/**
 * Types component
 */
export const Types: React.FC<TypesProps> = ({
  types,
  onAdd,
  onSelect,
  onDelete,
}: TypesProps) => {
  const [show, open, close] = useDialog()
  return (
    <>
      <Row>
        <Column flexGrow={1}>
          <Heading.h1>Types</Heading.h1>
          <Typography>
            The gazetteer finds the type below by matching the keywords declared
            for each type.
          </Typography>
        </Column>
        <Button my={2} onClick={open}>
          Add Type
        </Button>
      </Row>
      <Card>
        <List>
          {types.map((type) => (
            <Type
              key={type}
              type={type}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
        </List>
        <AddType open={show} close={close} onAdd={onAdd} />
      </Card>
    </>
  )
}
