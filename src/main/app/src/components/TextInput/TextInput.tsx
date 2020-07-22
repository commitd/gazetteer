import {
  Button,
  Card,
  CardActions,
  Row,
  TextField,
} from '@committed/components'
import React from 'react'

export interface TextInputProps {
  text: string
  label: string
  buttonLabel: string
  helperText: string
  onChange: (newValue: string) => void
  onSubmit: () => void
}

/**
 * TextInput component
 */
export const TextInput: React.FC<TextInputProps> = ({
  text,
  label,
  buttonLabel,
  helperText,
  onChange,
  onSubmit,
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    onChange(e.target.value)

  const handleClear = (): void => onChange('')

  return (
    <Card>
      <TextField
        m={2}
        label={label}
        value={text}
        onChange={handleChange}
        rows={10}
        helperText={helperText}
        multiline
        fullWidth
      />
      <CardActions>
        <Row width={1} justifyContent="flex-end">
          <Button variant="text" onClick={handleClear}>
            Clear
          </Button>
          <Button
            type="submit"
            color="primary"
            onClick={(): void => onSubmit()}
          >
            {buttonLabel}
          </Button>
        </Row>
      </CardActions>
    </Card>
  )
}
