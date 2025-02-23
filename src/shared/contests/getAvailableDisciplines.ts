import { contestsAvailableDisciplinesList } from '@/api'
import { useQuery } from '@tanstack/react-query'

export function useAvailableDisciplines() {
  return useQuery({
    queryKey: ['available-disciplines'],
    queryFn: () => contestsAvailableDisciplinesList(),
  })
}
