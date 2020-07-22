import {
  Button,
  Card,
  Checkbox,
  Icons,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Row,
} from '@committed/components'
import React from 'react'
import { useImmer } from 'use-immer'
import { useDialog } from '../../hooks/useDialog'
import { AddType } from '../AddType'

export interface KeywordProps {
  keyword: string
  count: number
  selected: boolean
  add: (keyword: string) => void
  remove: (keyword: string) => void
}
export const Keyword: React.FC<KeywordProps> = ({
  keyword,
  count,
  selected,
  add,
  remove,
}: KeywordProps) => {
  const handleSelect = () => {
    if (selected) {
      remove(keyword)
    } else {
      add(keyword)
    }
  }

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <Checkbox
            edge="start"
            color="primary"
            tabIndex={-1}
            disableRipple
            checked={selected}
            onClick={handleSelect}
          />
        </ListItemIcon>
        <ListItemText primary={keyword} />
        <ListItemSecondaryAction>
          <ListItemText primary={count} />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  )
}

export interface KeywordsProps {
  type: string
  keywords: { [keyword: string]: number }
  onDelete: (keywords: string[]) => void
  onAdd: (type: string, keywords: string) => void
}

/**
 * Keywords component
 */
export const Keywords: React.FC<KeywordsProps> = ({
  type,
  keywords,
  onDelete,
  onAdd,
}: KeywordsProps) => {
  const [selected, updateSelected] = useImmer<string[]>([])
  const [show, open, close] = useDialog()

  function addKeyword(keyword: string): void {
    updateSelected((draft): void => {
      draft.push(keyword)
    })
  }

  function removeKeyword(keyword: string): void {
    updateSelected((draft) => {
      const index = draft.indexOf(keyword)
      if (index !== -1) draft.splice(index, 1)
    })
  }

  function handleDelete(): void {
    onDelete(selected)
  }

  function handleSelectAll(): void {
    updateSelected((_draft) => {
      return Object.keys(keywords)
    })
  }

  function handleSelectNone(): void {
    updateSelected((_draft) => {
      return []
    })
  }
  return (
    <>
      <Row my={2}>
        <Button color="primary" mr={2} onClick={open}>
          <Icons.Add />
          Add
        </Button>
        <Button
          mr={2}
          disabled={selected.length === keywords.length}
          onClick={handleSelectAll}
        >
          <Icons.CheckBox />
          Select All
        </Button>
        <Button
          mr={2}
          disabled={selected.length === 0}
          onClick={handleSelectNone}
        >
          <Icons.CheckBoxOutlineBlank />
          Clear Selection
        </Button>
        <Button
          color="secondary"
          disabled={selected.length === 0}
          onClick={handleDelete}
        >
          <Icons.Delete />
          Delete
        </Button>
      </Row>
      <Card>
        <List>
          {Object.keys(keywords).map((keyword) => (
            <Keyword
              key={keyword}
              keyword={keyword}
              selected={selected.includes(keyword)}
              add={addKeyword}
              count={keywords[`${keyword}`]}
              remove={removeKeyword}
            />
          ))}
        </List>
      </Card>
      <AddType open={show} fixedType={type} close={close} onAdd={onAdd} />
    </>
  )
}
