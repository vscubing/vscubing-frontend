import { type UseInfiniteQueryOptions, type InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

export function useControllerWithInfiniteScroll<T extends { totalPages?: number }>(
  query: UseInfiniteQueryOptions<
    T,
    AxiosError<unknown, unknown>,
    InfiniteData<T, unknown>,
    T,
    (string | number)[],
    number
  >,
) {
  const { data, fetchNextPage } = useInfiniteQuery(query)

  const totalPages = data?.pages?.[0].totalPages
  const allPagesLoaded = totalPages && data?.pages?.length === totalPages

  const { isIntersecting, entry: lastEntry, ref: lastElementRef } = useIntersectionObserver({ rootMargin: '10%' })
  useEffect(() => {
    if (isIntersecting && !allPagesLoaded) {
      void fetchNextPage()
    }
  }, [lastEntry, isIntersecting, allPagesLoaded, fetchNextPage])

  return { data, lastElementRef }
}
