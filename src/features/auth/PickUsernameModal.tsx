import { useState } from 'react'

type PickUsernameModalProps = { onSubmit: (username: string) => void }
export const PickUsernameModal = ({ onSubmit }: PickUsernameModalProps) => {
  const [username, setUsername] = useState('')

  const handleSubmit = async () => {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      return
    }

    onSubmit(trimmedUsername)
  }

  return (
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
}
