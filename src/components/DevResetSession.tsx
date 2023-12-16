import { axiosClient } from '@/api/axios'
import { useNavigate } from 'react-router-dom'

export const DevResetSession = () => {
  const navigate = useNavigate()
  const resetSession = async () => {
    try {
      await axiosClient.delete('/contests/round-session/')
      navigate('/contest')
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
