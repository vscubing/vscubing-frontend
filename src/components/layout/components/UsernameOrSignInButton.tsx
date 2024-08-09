import { SignInButton } from '@/components/shared'
import { AvatarIcon } from '@/components/ui'
import { useUser } from '@/features/auth'
import { cn } from '@/utils'

export function UsernameOrSignInButton({
  className,
  usernameEllipsis = false,
  textRight,
}: {
  className?: string
  usernameEllipsis?: boolean
  textRight?: boolean
}) {
  const { data: user } = useUser()

  return (
    <span className={cn('flex items-center', { 'flex-1': usernameEllipsis, textRight: 'justify-end' }, className)}>
      {user ? (
        <>
          <span
            className={cn(
              'vertical-alignment-fix text-large whitespace-nowrap',
              {
                'w-0 flex-1 overflow-x-clip text-ellipsis': usernameEllipsis,
              },
              textRight ? 'text-right' : 'pl-4',
            )}
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
