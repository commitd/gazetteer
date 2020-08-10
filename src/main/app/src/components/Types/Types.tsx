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
import { Type, TypeConfig } from '../../types'
import { AddType } from '../AddType'
import { ConfirmDialog } from '../ConfirmDialog'

export interface BaseProps {
  onSelect: (type: Type) => void
  onDelete: (type: Type) => void
  onUpdate: (type: Type, config: TypeConfig) => void
}

export interface TypeProps extends BaseProps {
  type: Type
}

export interface TypesListProps extends BaseProps {
  types: Type[]
}

export interface TypesProps extends BaseProps {
  types: Type[]
  onAdd: (config: TypeConfig) => void
}

export const TypeComponent: React.FC<TypeProps> = ({
  type,
  onUpdate,
  onSelect,
  onDelete,
}: TypeProps) => {
  const [showEdit, openEdit, closeEdit] = useDialog()
  const [showDelete, openDelete, closeDelete] = useDialog()

  return (
    <>
      <ListItem button onClick={(): void => onSelect(type)}>
        <ListItemText
          primary={
            <Row alignItems="baseline">
              <Typography mr={2}>{type.value}</Typography>
              <Typography light={true} fontSize={-2} mr={2}>
                {type.ignoreCase ? 'Ignore case,' : 'Respect case,'}
              </Typography>
              <Typography light={true} fontSize={-2}>
                {type.onlyWholeWords ? 'Whole words' : 'Partial words'}
              </Typography>
            </Row>
          }
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit" onClick={openEdit}>
            <Icons.Edit />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={openDelete}>
            <Icons.Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <AddType
        open={showEdit}
        onClose={closeEdit}
        type={type}
        onAdd={(config): void => onUpdate(type, config)}
      />
      <ConfirmDialog
        open={showDelete}
        onClose={closeDelete}
        title={`Delete type '${type.value}' and all keywords?`}
        onConfirm={(): void => onDelete(type)}
      />
    </>
  )
}

/**
 * Types component
 */
export const TypesList: React.FC<TypesListProps> = ({
  types,
  onSelect,
  onDelete,
  onUpdate,
}: TypesListProps) => {
  return (
    <List>
      {types.map((type) => (
        <TypeComponent
          key={type.id}
          type={type}
          onSelect={onSelect}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </List>
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
  onUpdate,
}: TypesProps) => {
  const [show, open, close] = useDialog()
  return (
    <>
      <Row>
        <Column flexGrow={1}>
          <Heading.h1>Types</Heading.h1>
          <Typography>
            The gazetteer finds the types below by matching the keywords
            declared for each type.
          </Typography>
        </Column>
        <Button my={2} onClick={open}>
          Add Type
        </Button>
      </Row>
      <Card mt={2} mb={4}>
        {types.length > 0 ? (
          <TypesList
            types={types}
            onSelect={onSelect}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ) : (
          <Column alignItems="center">
            <Heading.h2 my={3}>No types</Heading.h2>
            <Button color="primary" size="large" mb={4} onClick={open}>
              Add
            </Button>
          </Column>
        )}
        <AddType open={show} onClose={close} onAdd={onAdd} />
      </Card>
    </>
  )
}
