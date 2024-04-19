import { axiosClient } from '@/lib/axios'
import { queryOptions } from '@tanstack/react-query'

async function getOngoingSlug() {
  const res = await axiosClient.get<{ id: number }>('/contests/ongoing-contest/retrieve/')
  return String(res.data.id)
}

export const ongoingSlugQuery = queryOptions({
  queryKey: ['ongoing-contest-slug'],
  queryFn: getOngoingSlug,
})
