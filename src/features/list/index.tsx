import { type ReactNode, type ReactElement } from 'react'

type ListItemData = { id: React.Key }
type ListProps<T extends ListItemData> = {
  list: T[] | undefined
  pageSize: number | undefined
  renderItem: (data: T) => ReactNode
  renderSkeleton: () => ReactElement
  lastElementRef?: (node?: Element | null) => void
  fakeElementRef: React.RefObject<HTMLLIElement>
  containerRef: React.RefObject<HTMLUListElement>
}
function List<T extends ListItemData>({
  fakeElementRef,
  containerRef,
  list,
  pageSize,
  lastElementRef,
  renderItem,
  renderSkeleton,
}: ListProps<T>) {
  return (
    <ul className='flex flex-1 flex-col gap-3' ref={containerRef}>
      <li aria-hidden className='invisible fixed' ref={fakeElementRef}>
        {renderSkeleton()}
      </li>
      <ListInner
        list={list}
        pageSize={pageSize}
        lastElementRef={lastElementRef}
        renderItem={renderItem}
        renderSkeleton={renderSkeleton}
      />
    </ul>
  )
}

function ListInner<T extends ListItemData>({
  list,
  pageSize,
  lastElementRef,
  renderItem,
  renderSkeleton,
}: Omit<ListProps<T>, 'fakeElementRef' | 'containerRef'>) {
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

export { List }
