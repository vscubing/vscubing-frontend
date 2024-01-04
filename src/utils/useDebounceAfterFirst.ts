import { useState, useEffect } from 'react'

export function useDebounceAfterFirst<T>(debounceMs: number, initValue?: T) {
  const [value, setValue] = useState<T | undefined>(initValue)
  const [debouncedValue, setDebouncedValue] = useState<T>()
  useEffect(() => {
    if (value === undefined) {
      return
    }

    if (debouncedValue === undefined) {
      setDebouncedValue(value)
      return
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceMs)
    return () => clearTimeout(timeout)
  }, [value, debouncedValue, debounceMs])
  return [debouncedValue, setValue] as const
}
