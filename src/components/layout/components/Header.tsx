import { AvatarIcon, CloseIcon, MenuIcon } from '@/components/ui'
import { SignInButton } from '@/components/ui'
import { userQuery } from '@/features/auth'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { Logo } from './Logo'
import * as Dialog from '@radix-ui/react-dialog'
import { Navbar } from './Navbar'
import { Copyright, LogoutButton, SocialLinks } from '.'
import { cn } from '@/utils'

export function Header({ caption }: { caption: ReactNode }) {
  const { data: user } = useQuery(userQuery)

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
        <MobileMenu className='hidden md:flex' />
      </div>
    </header>
  )
}

export function MobileMenu({ className }: { className?: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={cn('h-[44px] w-[44px] items-center justify-center', className)}>
          <MenuIcon />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className='fixed inset-[calc(1.625rem-1px)] z-50 flex flex-col rounded-2xl bg-black-80 pb-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
          <div className='flex justify-end p-3'>
            <Dialog.Close className='flex h-11 w-11 items-center justify-center'>
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Navbar /> {/* TODO: close on click on active navigation item */}
          <div className='mt-auto flex flex-col items-center'>
            <SocialLinks />
            <LogoutButton className='mt-4' />
            <Copyright className='mt-6' />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
