import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from '@committed/components'
import React, { useState } from 'react'

export interface AddTypeProps {
  fixedType?: string | undefined
  open: boolean
  close: () => void
  onAdd: (type: string, keywords: string) => void
}

/**
 * AddType component
 */
export const AddType: React.FC<AddTypeProps> = ({
  fixedType,
  open,
  close,
  onAdd,
}: AddTypeProps) => {
  const [type, setType] = useState<string>(fixedType ?? '')
  const [keywords, setKeywords] = useState('')

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setType(e.target.value)
  }

  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setKeywords(e.target.value)
  }

  const handleSubmit = (): void => {
    onAdd(type, keywords)
    setType('')
    setKeywords('')
    close()
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add type</DialogTitle>
      {fixedType === undefined && (
        <TextField
          value={type}
          onChange={handleTypeChange}
          m={2}
          label="Type"
          fullWidth
        />
      )}
      <TextField
        value={keywords}
        m={2}
        label="Keywords"
        onChange={handleKeywordChange}
        rows={10}
        helperText="Input keywords one line at a time. Keywords can also be multi word phrases."
        multiline
        fullWidth
      />
      <DialogActions>
        <Button variant="text" onClick={close}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
