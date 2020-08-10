import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Switch,
} from '@committed/components'
import React, { useState } from 'react'
import { Type, TypeConfig } from '../../types/server-types'

export interface AddTypeProps {
  type?: Type | undefined
  open: boolean
  onClose: () => void
  onAdd: (config: TypeConfig) => void
}

/**
 * AddType component
 */
export const AddType: React.FC<AddTypeProps> = ({
  type,
  open,
  onClose,
  onAdd,
}: AddTypeProps) => {
  const [value, setValue] = useState<string>(type?.value ?? '')
  const [ignoreCase, setIgnoreCase] = useState<boolean>(
    type === undefined ? false : type.ignoreCase
  )
  const [onlyWholeWords, setOnlyWholeWords] = useState<boolean>(
    type === undefined ? true : type.onlyWholeWords
  )

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
  }

  const handleIgnoreCaseChange = (
    _e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIgnoreCase(!ignoreCase)
  }

  const handleOnlyWholeWords = (
    _e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setOnlyWholeWords(!onlyWholeWords)
  }

  const handleSubmit = (): void => {
    onAdd(Object.assign({ value, ignoreCase, onlyWholeWords }))
    onClose()
  }

  const handleClose = (): void => {
    setValue(type?.value ?? '')
    setIgnoreCase(type === undefined ? false : type.ignoreCase)
    setOnlyWholeWords(type === undefined ? true : type.onlyWholeWords)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {type === undefined ? 'Add type' : `Update type '${type.value}'`}
      </DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          onChange={handleValueChange}
          my={2}
          minWidth={1 / 2}
          label="Type"
          fullWidth
          helperText={'The type assigned to matches'}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!ignoreCase}
              onChange={handleIgnoreCaseChange}
              color="primary"
            />
          }
          label="Case sensitive"
        />
        <FormControlLabel
          control={
            <Switch
              checked={onlyWholeWords}
              onChange={handleOnlyWholeWords}
              color="primary"
            />
          }
          label="Only match whole words"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={value.length === 0}
          onClick={handleSubmit}
        >
          {type === undefined ? 'Add' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
