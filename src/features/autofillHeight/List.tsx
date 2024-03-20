import { cn } from '@/utils'
import { type ReactNode, type ReactElement } from 'react'
import { type Behavior } from '.'

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

type ListItemData = { id: React.Key }
type ListProps<T extends ListItemData> = {
  list: T[] | undefined
  pageSize: number | undefined
  renderItem: (item: T) => ReactNode
  renderSkeleton: () => ReactElement
  lastElementRef?: (node?: Element | null) => void
}
function List<T extends ListItemData>({
  list,
  pageSize,
  lastElementRef,
  renderItem,
  renderSkeleton,
}: Pick<ListProps<T>, 'list' | 'pageSize' | 'lastElementRef' | 'renderItem' | 'renderSkeleton'>) {
  if (pageSize === undefined) {
    return null
  }
  if (list === undefined) {
    return Array.from({ length: pageSize }, (_, index) => <li key={index}>{renderSkeleton()}</li>)
  }

  return list.map((data, index) => (
    <li key={data.id} ref={index === list.length - 1 ? lastElementRef : undefined}>
      {renderItem(data)}
    </li>
  ))
}

type ListWithPinnedItemProps<T extends ListItemData> = ListProps<T> & {
  isFetching: boolean
  renderPinnedItem: () => ReactNode
  pinnedItem?: { isDisplayedSeparately: boolean }
  pinnedItemPage?: number
  behavior: Behavior
}
function ListWithPinnedItem<T extends ListItemData>({
  list,
  pageSize,
  isFetching,
  pinnedItemPage,
  pinnedItem,
  renderPinnedItem,
  renderSkeleton,
  renderItem,
  lastElementRef,
  behavior,
}: ListWithPinnedItemProps<T>) {
  if (!pageSize) {
    return null
  }

  let isPinnedDisplayedSepararely = false
  if (behavior === 'pagination') {
    isPinnedDisplayedSepararely = !!pinnedItem && (pinnedItem.isDisplayedSeparately || isFetching)
  } else if (behavior === 'infinite-scroll') {
    isPinnedDisplayedSepararely = !!pinnedItem && pinnedItemPage !== 1
  }

  const skeletonSize = isPinnedDisplayedSepararely ? pageSize - 1 : pageSize
  const isSkeletonShown = !list || (isFetching && behavior === 'pagination')
  return (
    <>
      {isPinnedDisplayedSepararely && (
        <li className={cn({ 'sticky top-20 z-10': behavior === 'infinite-scroll' })}>{renderPinnedItem()}</li>
      )}
      {isSkeletonShown
        ? Array.from({ length: skeletonSize }, (_, index) => <li key={index}>{renderSkeleton()}</li>)
        : list?.map((item, index) => (
            <li ref={index === list.length - 1 ? lastElementRef : undefined} key={item.id}>
              {renderItem(item)}
            </li>
          ))}
    </>
  )
}

export type { ListItemData, ListWrapperProps, ListProps, ListWithPinnedItemProps }
export { ListWrapper, List, ListWithPinnedItem }
