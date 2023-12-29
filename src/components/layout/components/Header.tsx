import { AvatarIcon, GhostButton, GoogleIcon } from '@/components'
import { useLogin, userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'

export function Header({ caption }: { caption: string }) {
  const { data: userData } = useQuery(userQuery)
  const login = useLogin()

  return (
    <div className='flex items-center justify-between rounded-2xl bg-black-80 px-4 py-3'>
      <p className='title-h3'>{caption}</p>
      {userData ? (
        <div>
          <AvatarIcon className='mr-3 inline' />
          <span className='text-lg'>{userData.username}</span>
        </div>
      ) : (
        <GhostButton className='gap-3' onClick={() => login()}>
          <GoogleIcon />
          Sign in with google
        </GhostButton>
      )}
    </div>
  )
}
