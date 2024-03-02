import { AvatarIcon, MenuIcon } from '@/components/ui'
import { SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { Logo } from './Logo'
import { useSetAtom } from 'jotai'
import { mobileMenuOpenAtom } from '../store/mobileMenuOpenAtom'

export function Header({ caption }: { caption: ReactNode }) {
  const { data: user } = useQuery(userQuery)
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  return (
    <header className='flex gap-3'>
      <Logo className='hidden md:flex' />
      <div className='flex min-h-[4.375rem] flex-1 items-center justify-between rounded-2xl bg-black-80 px-4 md:justify-end'>
        <div className='title-h3'>{caption}</div>
        {user?.isAuthed ? (
          <div>
            <AvatarIcon className='mr-3 inline' />
            <span className='text-lg'>{user.username}</span>
          </div>
        ) : (
          <SignInButton variant='ghost' />
        )}
        <button
          className='hidden h-[44px] w-[44px] items-center justify-center md:flex'
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
