import { useRef, useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'

export function useAutofillHeight<
  TContainer extends HTMLElement = HTMLUListElement,
  TFake extends HTMLElement = HTMLLIElement,
>(min = 1) {
  const containerRef = useRef<TContainer>(null)
  const fakeElementRef = useRef<TFake>(null)
  const [fittingCount, setFittingCount] = useState<number>()

  const computeFittingAmount = useCallback(() => {
    flushSync(() => setFittingCount(undefined))
    const containerHeight = containerRef.current?.clientHeight
    const fakeElementHeight = fakeElementRef.current?.clientHeight
    if (!fakeElementHeight || !containerHeight) {
      setFittingCount(undefined)
      return
    }

    const gap = parseInt(getComputedStyle(containerRef.current).gap)
    let count = Math.floor((containerHeight + gap - 1) / (fakeElementHeight + gap))
    count = Math.max(count, min)

    setFittingCount(count)
  }, [containerRef, fakeElementRef, min])

  useEffect(() => {
    addEventListener('resize', computeFittingAmount)
    setTimeout(() => computeFittingAmount(), 0) // setTimeout to suppress "flushSync was called from inside a lifecycle method" warning
    return () => removeEventListener('resize', computeFittingAmount)
  }, [containerRef, fakeElementRef, computeFittingAmount])
  return { fittingCount, containerRef, fakeElementRef }
}
