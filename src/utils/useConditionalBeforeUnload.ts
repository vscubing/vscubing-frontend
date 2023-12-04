import { useEffect } from 'react'

export const useConditionalBeforeUnload = (condition: boolean, callback: () => void) => {
  useEffect(() => {
    if (condition) {
      window.addEventListener('beforeunload', callback)
    }

    return () => window.removeEventListener('beforeunload', callback)
  }, [condition, callback])
}
