import { MenuIcon } from '@/components/ui'
import { type ReactNode } from 'react'
import { Logo } from './components/Logo'
import { useSetAtom } from 'jotai'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { UsernameOrSignInButton } from './components/UsernameOrSignInButton'

export function Header({ title }: { title: ReactNode }) {
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  return (
    <header className='z-40 bg-black-100 sm:sticky sm:top-0 sm:py-3'>
      <div className='flex h-[var(--header-height)] gap-3 sm:gap-2'>
        <Logo className='hidden lg:flex sm:flex-1' />
        <div className='flex flex-1 items-center justify-between rounded-2xl bg-black-80 px-4 lg:justify-end sm:min-h-0 sm:flex-grow-0 sm:p-[0.375rem]'>
          <h1 className='title-h3 lg:hidden sm:hidden'>{title}</h1>
          <UsernameOrSignInButton className='sm:hidden' />
          <button
            className='ml-4 hidden h-[44px] w-[44px] items-center justify-center lg:flex sm:ml-0'
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
