import { AvatarIcon, SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'

export function UsernameOrSignInButton() {
  const { data: user } = useQuery(userQuery)

  if (!user) {
    return
  }

  if (!user.isAuthed) {
    return <SignInButton variant='ghost' />
  }

  return (
    <div className='flex items-center lg:mr-3'>
      <AvatarIcon className='mr-3 inline-block' />
      <span className='vertical-alignment-fix text-lg'>{user.username}</span>
    </div>
  )
}
