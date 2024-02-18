import { useState, useEffect } from 'react'

export function useDebounceAfterFirst<T>(value: T | undefined, debounceMs = 200) {
  const [debouncedValue, setDebouncedValue] = useState<T>()
  useEffect(() => {
    if (value === undefined) {
      return
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceMs)
    return () => clearTimeout(timeout)
  }, [value, debouncedValue, debounceMs])
  return debouncedValue ?? value
}
