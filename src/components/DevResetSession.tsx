import { axiosClient } from '@/api/axios'
import { useNavigate } from '@tanstack/react-router'

export function DevResetSession() {
  const navigate = useNavigate()
  const resetSession = async () => {
    try {
      await axiosClient.delete('/contests/round-session/')
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
