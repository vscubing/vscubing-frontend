import { useRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

export function useAutofillHeight<TContainer extends HTMLElement, TFake extends HTMLElement>(shouldCompute = true) {
  const containerRef = useRef<TContainer>(null)
  const fakeElementRef = useRef<TFake>(null)
  const [fittingCount, setFittingAmount] = useState(0)

  useEffect(() => {
    if (!shouldCompute) return
    function computeFittingAmount() {
      flushSync(() => setFittingAmount(0))
      const containerHeight = containerRef.current?.clientHeight
      const fakeElementHeight = fakeElementRef.current?.clientHeight
      if (fakeElementHeight && containerHeight) {
        const gap = parseInt(getComputedStyle(containerRef.current).gap)
        setFittingAmount(Math.floor((containerHeight + gap - 1) / (fakeElementHeight + gap)))
      }
    }
    addEventListener('resize', computeFittingAmount)
    setTimeout(() => computeFittingAmount(), 0) // setTimeout to suppress "flushSync was called from inside a lifecycle method" warning
    return () => removeEventListener('resize', computeFittingAmount)
  }, [containerRef, fakeElementRef, shouldCompute])
  return { fittingCount, containerRef, fakeElementRef }
}
