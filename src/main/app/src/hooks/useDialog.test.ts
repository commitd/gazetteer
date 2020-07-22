/* eslint-disable @typescript-eslint/no-floating-promises */
import { renderHook, act } from '@testing-library/react-hooks'
import { useDialog } from './useDialog'

test('should start closed', () => {
  const { result: first } = renderHook(() => useDialog())
  const [falseValue] = first.current
  expect(falseValue).toBe(false)
})

test('open should open, close should close', () => {
  const { result } = renderHook(() => useDialog())
  expect(result.current[0]).toBe(false)

  act(() => {
    result.current[1]()
  })

  expect(result.current[0]).toBe(true)

  act(() => {
    result.current[2]()
  })

  expect(result.current[0]).toBe(false)
})
