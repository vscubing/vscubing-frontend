import { userQuery, putChangeUsername, USER_QUERY_KEY } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { SecondaryButton } from './ui'

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
    await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
    setIsVisible(false)
  }

  return (
    isVisible && (
      <div className='fixed inset-0 z-10 flex items-center justify-center bg-black-100 bg-opacity-40'>
        <div className='bg-black-100 p-10 text-white'>
          <div>Choose a nickname</div>
          <input
            className='block bg-[#11191F]'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <SecondaryButton onClick={handleSubmit} className='mt-4'>
            Submit
          </SecondaryButton>
        </div>
      </div>
    )
  )
}
