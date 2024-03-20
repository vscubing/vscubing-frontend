import { AvatarIcon, SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { cn } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export function UsernameOrSignInButton({
  className,
  usernameEllipsis = false,
}: {
  className?: string
  usernameEllipsis?: boolean
}) {
  const { data: user } = useQuery(userQuery)

  if (!user) {
    return
  }

  return (
    <span className={cn('flex items-center justify-end', { 'flex-1': usernameEllipsis }, className)}>
      {user.isAuthed ? (
        <>
          <span
            className={cn('vertical-alignment-fix whitespace-nowrap text-right text-large', {
              'w-0 flex-1 overflow-x-clip text-ellipsis': usernameEllipsis,
            })}
          >
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
