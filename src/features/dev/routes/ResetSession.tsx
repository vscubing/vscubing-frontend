import { USER_QUERY_KEY } from '@/features/auth'
import { axiosClient } from '@/lib/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

export function ResetSession() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const resetSession = async () => {
    try {
      await axiosClient.delete('/contests/round-session/')
      await queryClient.refetchQueries({ queryKey: [USER_QUERY_KEY] })
      await navigate({ to: '/contests/ongoing' })
    } catch (err) {
      alert("either you don't have any results to reset or something went wrong")
    }
  }

  return (
    <button onClick={resetSession} className='border-white-100 rounded-s border-2 p-5'>
      reset session
    </button>
  )
}
