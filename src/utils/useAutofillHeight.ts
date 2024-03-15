import { useRef, useState, useEffect } from 'react'

export function useAutofillHeight<
  TContainer extends HTMLElement = HTMLUListElement,
  TFake extends HTMLElement = HTMLLIElement,
>(min = 1) {
  const containerRef = useRef<TContainer>(null)
  const fakeElementRef = useRef<TFake>(null)
  const [fittingCount, setFittingCount] = useState<number>()

  useEffect(() => {
    if (!containerRef.current || !fakeElementRef.current) {
      return
    }

    const containerHeight = containerRef.current?.clientHeight
    const fakeElementHeight = fakeElementRef.current?.clientHeight

    const gap = parseInt(getComputedStyle(containerRef.current).gap)
    let count = Math.floor((containerHeight + gap - 1) / (fakeElementHeight + gap))
    count = Math.max(count, min)

    setFittingCount(count)
  }, [containerRef, fakeElementRef, min])
  return { fittingCount, containerRef, fakeElementRef }
}
