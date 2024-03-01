import { AvatarIcon } from '@/components/ui'
import { SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { Logo } from './Logo'

export function Header({ caption }: { caption: ReactNode }) {
  const { data: user } = useQuery(userQuery)

  return (
    <header className='flex gap-3'>
      <Logo className='hidden md:flex' />
      <div className='flex min-h-[4.375rem] flex-1 items-center justify-between rounded-2xl bg-black-80 px-4'>
        <div className='title-h3'>{caption}</div>
        {user?.isAuthed ? (
          <div>
            <AvatarIcon className='mr-3 inline' />
            <span className='text-lg'>{user.username}</span>
          </div>
        ) : (
          <SignInButton variant='ghost' />
        )}
      </div>
    </header>
  )
}
