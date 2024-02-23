import { userQuery, putChangeUsername, USER_QUERY_KEY } from '@/features/auth'
import { queryClient } from '@/lib/reactQuery'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from './AlertDialog'
import { Input } from './ui'

export function PickUsernameModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [username, setUsername] = useState('')
  const { data: userData } = useQuery(userQuery)

  useEffect(() => {
    if (userData?.authCompleted === false) {
      setIsVisible(true)
    }
  }, [userData])

  async function handleSubmit() {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      // TODO: add proper validation
      return
    }

    await putChangeUsername(trimmedUsername)
    await queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] })
    setIsVisible(false)
  }

  return (
    <AlertDialog open={isVisible}>
      <AlertDialogContent>
        <AlertDialogTitle>Choose your nickname</AlertDialogTitle>
        <Input
          placeholder='Enter your nickname'
          className='min-w-[20rem]'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
