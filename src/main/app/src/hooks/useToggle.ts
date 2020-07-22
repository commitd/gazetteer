import { useState } from 'react'

/**
 * Utility hook for boolean toggle operations
 *
 * <p> returns the value, a toggle function, and the original setValue in case required.
 */
export function useToggle(
  startState: boolean
): [boolean, () => void, (force: boolean) => void] {
  const [value, setValue] = useState(startState)

  const toggleValue = (): void => setValue(!value)

  return [value, toggleValue, setValue]
}
