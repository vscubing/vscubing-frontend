import { CONTEST_RESULTS_QUERY_KEY } from '@/features/contests'
import { axiosClient } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function DevResetSession() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const resetSession = async () => {
    try {
      await axiosClient.delete('/contests/round-session/')
      queryClient.refetchQueries({ queryKey: [CONTEST_RESULTS_QUERY_KEY] })
      queryClient.refetchQueries({ queryKey: [SOLVE_CONTEST_STATE_QUERY_KEY] })
      navigate({ to: '/contest' })
    } catch (err) {
      alert("either you don't have any results to reset or something went wrong")
    }
  }

  return (
    <button onClick={resetSession} className='rounded-s border-2 border-white p-5'>
      reset session
    </button>
  )
}
