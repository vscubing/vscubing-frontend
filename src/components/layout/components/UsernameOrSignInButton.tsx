import { SignInButton } from '@/components/shared'
import { AvatarIcon } from '@/components/ui'
import { useUser } from '@/features/auth'
import { cn } from '@/utils'

export function UsernameOrSignInButton({
  className,
  usernameEllipsis = false,
}: {
  className?: string
  usernameEllipsis?: boolean
}) {
  const { data: user } = useUser()

  return (
    <span className={cn('flex items-center justify-end', { 'flex-1': usernameEllipsis }, className)}>
      {user ? (
        <>
          <span
            className={cn('vertical-alignment-fix text-large whitespace-nowrap text-right', {
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
