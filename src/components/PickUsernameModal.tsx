import { USER_QUERY_KEY, putChangeUsername, userQuery } from '@/api/accounts'
import { queryClient } from '@/api/reactQuery'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function PickUsernameModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [username, setUsername] = useState('')
  const { data: userData } = useQuery(userQuery)

  useEffect(() => {
    if (userData && !userData.authCompleted) {
      setIsVisible(true)
    }
  }, [userData])

  async function handleSubmit() {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      return
    }

    await putChangeUsername(trimmedUsername)
    queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
    setIsVisible(false)
  }

  return (
    isVisible && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
        <div className='bg-panels p-[20px] text-white'>
          <div>Choose a nickname</div>
          <input
            className='block bg-[#11191F]'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  )
}
