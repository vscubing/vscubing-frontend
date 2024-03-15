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
    <span className={cn('flex flex-1 items-center', className)}>
      {user.isAuthed ? (
        <>
          <span className='vertical-alignment-fix w-0 flex-1 overflow-x-clip text-ellipsis whitespace-nowrap text-right text-lg'>
            <AvatarIcon className='mr-3 inline-block' />
            {user.username}
          </span>
        </>
      ) : (
        <SignInButton variant='ghost' />
      )}
    </span>
  )
}
