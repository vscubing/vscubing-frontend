import { AvatarIcon, SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export function UsernameOrSignInButton({ className }: { className?: string }) {
  const { data: user } = useQuery(userQuery)

  if (!user) {
    return
  }

  return (
    <div className={cn('flex items-center', className)}>
      {user.isAuthed ? (
        <>
          <AvatarIcon className='mr-3 inline-block' />
          <span className='vertical-alignment-fix text-lg'>{user.username}</span>
        </>
      ) : (
        <SignInButton variant='ghost' />
      )}
    </div>
  )
}
