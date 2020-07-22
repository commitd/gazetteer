import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogProps,
} from '@committed/components'
import React from 'react'

interface ConfirmDialogProps extends DialogProps {
  /**
   * The text to display on the confirm button
   */
  confirmButtonText?: string
  /**
   * The text to display on the cancel button
   */
  cancelButtonText?: string
  /**
   * Action to perform on confirm
   */
  onConfirm: () => void
  /**
   * Action to perform on close
   */
  onClose: () => void
  /**
   * The title of the dialog
   */
  title?: string
}

/**
 * Use this component to confirm an action with the user
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title = 'Confirm Change',
  onConfirm,
  onClose,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
  ...dialogProps
}: ConfirmDialogProps) => {
  return (
    <Dialog onClose={onClose} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          {cancelButtonText}
        </Button>
        <Button
          color="primary"
          onClick={(): void => {
            onConfirm()
            onClose()
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
