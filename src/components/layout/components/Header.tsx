import { AvatarIcon } from '@/components/ui'
import { SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode } from 'react'

export function Header({ caption }: { caption: ReactNode }) {
  const { data: user } = useQuery(userQuery)

  return (
    <header className='flex min-h-[4.375rem] items-center justify-between rounded-2xl bg-black-80 px-4'>
      <div className='title-h3'>{caption}</div>
      {user?.isAuthed ? (
        <div>
          <AvatarIcon className='mr-3 inline' />
          <span className='text-lg'>{user.username}</span>
        </div>
      ) : (
        <SignInButton variant='ghost' />
      )}
    </header>
  )
}
