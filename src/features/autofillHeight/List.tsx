import { cn } from '@/utils'
import { type ReactNode, type ReactElement } from 'react'
import { type Behavior } from '.'
import { useIntersectionObserver } from 'usehooks-ts'

type ListWrapperProps = {
  children: ReactNode
  className?: string
  renderFakeElement: () => ReactElement
  fakeElementRef: React.RefObject<HTMLLIElement>
  containerRef: React.RefObject<HTMLUListElement>
}
function ListWrapper({
  children,
  className,
  fakeElementRef,
  containerRef,
  renderFakeElement: renderSkeleton,
}: ListWrapperProps) {
  return (
    <ul className={cn('flex flex-1 flex-col gap-2', className)} ref={containerRef}>
      <li aria-hidden className='invisible fixed' ref={fakeElementRef}>
        {renderSkeleton()}
      </li>
      {children}
    </ul>
  )
}

type ListProps<T> = {
  list: T[] | undefined
  pageSize: number | undefined
  getItemKey: (item: T) => React.Key
  renderItem: (item: T, isFirst: boolean) => ReactNode
  renderSkeleton: () => ReactElement
  lastElementRef?: (node?: Element | null) => void
}
function List<T>({ list, pageSize, getItemKey, lastElementRef, renderItem, renderSkeleton }: ListProps<T>) {
  if (pageSize === undefined) {
    return null
  }
  if (list === undefined) {
    // TODO: change the condition to isFetching
    return Array.from({ length: pageSize }, (_, index) => <li key={index}>{renderSkeleton()}</li>)
  }

  return list.map((item, index) => (
    <li key={getItemKey(item)} ref={index === list.length - 1 ? lastElementRef : undefined}>
      {renderItem(item, index === 0)}
    </li>
  ))
}

type ListWithPinnedItemProps<T> = ListProps<T> & {
  isFetching: boolean
  renderPinnedItem: (isFirstOnPage: boolean, linkToPage?: number) => ReactNode
  pinnedItem?: { isDisplayedSeparately: boolean; page: number }
  isHighlighted: (item: T) => boolean
  behavior: Behavior
}
function ListWithPinnedItem<T>({
  list,
  pageSize,
  isFetching,
  getItemKey,
  pinnedItem,
  isHighlighted,
  renderPinnedItem,
  renderSkeleton,
  renderItem,
  lastElementRef,
  behavior,
}: ListWithPinnedItemProps<T>) {
  const { isIntersecting: isHighlightedIntersecting, ref: highlightedRef } = useIntersectionObserver({
    rootMargin: '-200px 0px -80px', // account for sticky header, pinned element's height and sticky navbar
  })

  if (!pageSize) {
    return null
  }

  let shouldPin = false
  if (behavior === 'pagination') {
    shouldPin = !!pinnedItem && (pinnedItem.isDisplayedSeparately || isFetching)
  } else if (behavior === 'infinite-scroll') {
    shouldPin = !!pinnedItem && !isHighlightedIntersecting
  }

  const skeletonSize = shouldPin ? pageSize - 1 : pageSize
  const isSkeletonVisible = !list || (isFetching && behavior === 'pagination')

  const linkToPinnedItemPage = behavior === 'pagination' ? pinnedItem?.page : undefined
  return (
    <>
      {shouldPin && (
        <li className={cn({ 'sticky top-[calc(var(--header-height)+2rem)] z-10': behavior === 'infinite-scroll' })}>
          {renderPinnedItem(true, linkToPinnedItemPage)}
        </li>
      )}
      {isSkeletonVisible
        ? Array.from({ length: skeletonSize }, (_, index) => <li key={index}>{renderSkeleton()}</li>)
        : list?.map((item, index) => (
            <li ref={index === list.length - 1 ? lastElementRef : undefined} key={getItemKey(item)}>
              <div ref={isHighlighted?.(item) ? highlightedRef : undefined}>
                {renderItem(item, index === 0 && !shouldPin)}
              </div>
            </li>
          ))}
    </>
  )
}

export type { ListWrapperProps, ListProps, ListWithPinnedItemProps }
export { ListWrapper, List, ListWithPinnedItem }
