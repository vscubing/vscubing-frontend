import { contestsOngoingContestRetrieveRetrieve } from '@/api'
import { queryOptions, useQuery } from '@tanstack/react-query'

async function getOngoingSlug() {
  const res = await contestsOngoingContestRetrieveRetrieve()
  return res.slug
}

export const ongoingSlugQuery = queryOptions({
  queryKey: ['ongoing-contest-slug'],
  queryFn: getOngoingSlug,
})

export function useOngoingSlug() {
  return useQuery(ongoingSlugQuery)
}
