import { cn } from '@/utils'
import { type FC, type Key, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export function AutofillHeightList<TItem extends { id: Key }>({
  items,
  onFittingCountChange,
  Item,
  ItemSkeleton,
  fakeItem,
  className,
}: {
  items?: TItem[]
  onFittingCountChange?: (fittingAmount: number) => void
  Item: FC<{ data: TItem }>
  ItemSkeleton: FC
  fakeItem: TItem
  className?: string
}) {
  const { fittingCount, containerRef, fakeElementRef } = useAutofillHeight<HTMLUListElement, HTMLLIElement>()
  useEffect(() => {
    if (fittingCount) {
      onFittingCountChange?.(fittingCount)
    }
  }, [fittingCount, onFittingCountChange])

  return (
    <ul className={cn('flex flex-1 flex-col gap-3', className)} ref={containerRef}>
      <li className='invisible fixed' aria-hidden ref={fakeElementRef}>
        <Item data={fakeItem} />
      </li>
      <Items
        items={items?.slice(0, fittingCount)}
        fittingCount={fittingCount}
        Item={Item}
        ItemSkeleton={ItemSkeleton}
      />
    </ul>
  )
}

function Items<TItem extends { id: Key }>({
  items,
  fittingCount,
  ItemSkeleton,
  Item,
}: {
  items?: TItem[]
  fittingCount?: number
  ItemSkeleton: FC
  Item: FC<{ data: TItem }>
}) {
  if (fittingCount === undefined) {
    return null
  }
  if (items === undefined) {
    return Array.from({ length: fittingCount }, (_, index) => <ItemSkeleton key={index} />)
  }
  if (items.length === 0) {
    return 'Seems like no one has solved yet' // TODO: add empty state
  }

  return items.map((item) => (
    <li key={item.id}>
      <Item data={item} />
    </li>
  ))
}

export function useAutofillHeight<TContainer extends HTMLElement, TFake extends HTMLElement>() {
  const containerRef = useRef<TContainer>(null)
  const fakeElementRef = useRef<TFake>(null)
  const [fittingCount, setFittingCount] = useState<number>()

  function computeFittingAmount() {
    flushSync(() => setFittingCount(undefined))
    const containerHeight = containerRef.current?.clientHeight
    const fakeElementHeight = fakeElementRef.current?.clientHeight
    if (!fakeElementHeight || !containerHeight) {
      setFittingCount(undefined)
      return
    }
    const gap = parseInt(getComputedStyle(containerRef.current).gap)
    const count = Math.floor((containerHeight + gap - 1) / (fakeElementHeight + gap))
    if (count === 0) {
      setFittingCount(undefined)
    } else {
      setFittingCount(count)
    }
  }

  useEffect(() => {
    addEventListener('resize', computeFittingAmount)
    setTimeout(() => computeFittingAmount(), 0) // setTimeout to suppress "flushSync was called from inside a lifecycle method" warning
    return () => removeEventListener('resize', computeFittingAmount)
  }, [containerRef, fakeElementRef])
  return { fittingCount, containerRef, fakeElementRef }
}
