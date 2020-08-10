import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  DialogContent,
} from '@committed/components'
import React, { useState } from 'react'

export interface AddKeywordsProps {
  type: string
  open: boolean
  close: () => void
  onAdd: (keywords: string) => void
}

/**
 * AddKeywords component
 */
export const AddKeywords: React.FC<AddKeywordsProps> = ({
  type,
  open,
  close,
  onAdd,
}: AddKeywordsProps) => {
  const [keywords, setKeywords] = useState('')

  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setKeywords(e.target.value)
  }

  const handleSubmit = (): void => {
    onAdd(keywords)
    setKeywords('')
    close()
  }

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{`Add keywords for type: ${type}`}</DialogTitle>
      <DialogContent>
        <TextField
          value={keywords}
          my={2}
          label="Keywords"
          onChange={handleKeywordChange}
          rows={10}
          helperText="Input keywords one line at a time. Keywords can also be multi word phrases."
          multiline
          fullWidth
        />
      </DialogContent>
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
