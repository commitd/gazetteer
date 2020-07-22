import { useState } from 'react'

/**
 * Utility hook for open and close of dialogs
 *
 * <p> returns the state value, a open function, and a close function.
 */
export function useDialog(): [boolean, () => void, () => void] {
  const [value, setValue] = useState(false)

  const open = (): void => setValue(true)
  const close = (): void => setValue(false)

  return [value, open, close]
}
