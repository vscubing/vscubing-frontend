import { USER_QUERY_KEY } from '@/features/auth'
import { axiosClient } from '@/lib/axios'
import { DEFAULT_DISCIPLINE } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function ResetSession() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const resetSession = async () => {
    try {
      await axiosClient.delete('/contests/round-session/')
      await queryClient.refetchQueries({ queryKey: [USER_QUERY_KEY] })
      await navigate({ to: '/contests/ongoing', search: { discipline: DEFAULT_DISCIPLINE } })
    } catch (err) {
      alert("either you don't have any results to reset or something went wrong")
    }
  }

  return (
    <button onClick={resetSession} className='rounded-s border-2 border-white-100 p-5'>
      reset session
    </button>
  )
}
