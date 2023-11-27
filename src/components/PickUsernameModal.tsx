import { putChangeUsername, useUser } from '@/api/accounts'
import { useEffect, useState } from 'react'

export const PickUsernameModal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [username, setUsername] = useState('')
  const { data: userData } = useUser()

  useEffect(() => {
    if (userData && !userData.auth_completed) {
      setIsVisible(true)
    }
  }, [userData])

  const handleSubmit = async () => {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      return
    }

    await putChangeUsername(trimmedUsername)
    window.location.reload()
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
