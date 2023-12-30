import { cn } from '@/utils'
import { type HTMLAttributes, forwardRef, useEffect, useImperativeHandle } from 'react'
import { useResizeDetector } from 'react-resize-detector'

type EllipsisProps = HTMLAttributes<HTMLSpanElement> & {
  text: string
}

const Ellipsis = forwardRef<HTMLSpanElement, EllipsisProps>(({ text, className, ...props }, ref) => {
  const { width, ref: innerRef } = useResizeDetector<HTMLSpanElement>()
  useEffect(() => {
    const elem = innerRef.current
    if (elem?.textContent && elem.offsetWidth < elem.scrollWidth) {
      elem.setAttribute('title', elem.textContent)
      return () => elem.removeAttribute('title')
    }
  }, [text, ref, innerRef, width])
  useImperativeHandle(ref, () => innerRef.current!, [innerRef])
  return (
    <span className={cn('overflow-x-clip text-ellipsis', className)} ref={innerRef} {...props}>
      {text}
    </span>
  )
})
Ellipsis.displayName = 'Ellipsis'

export { Ellipsis }
