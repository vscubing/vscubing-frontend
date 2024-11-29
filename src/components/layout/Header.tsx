import {
  AvatarIcon,
  ChevronDownIcon,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  GhostButton,
  LogoutIcon,
  MenuIcon,
  SettingIcon,
} from '@/components/ui'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { type ReactNode } from 'react'
import { LogoWithLinkToLanding } from './components/Logo'
import { useSetAtom } from 'jotai'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { cn } from '@/utils'
import { logout, useUser } from '@/features/auth'
import { AccountsCurrentUserOutput } from '@/api'
import { SignInButton } from '@/shared/SignInButton'

type HeaderProps = { title?: ReactNode; className?: string }
export function Header({ title, className }: HeaderProps) {
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)
  const { data: user } = useUser()

  return (
    <header className={cn('z-40 flex bg-black-100 sm:pb-2 sm:pt-3', className)}>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className='mr-2 hidden h-[4.375rem] w-[4.375rem] items-center justify-center rounded-2xl bg-black-80 lg:flex sm:h-14 sm:w-14'
      >
        <MenuIcon />
      </button>
      <div className='flex h-[var(--header-height)] flex-1 items-center justify-between rounded-2xl bg-black-80 px-4 lg:justify-end sm:pl-4 sm:pr-2'>
        <LogoWithLinkToLanding className='mr-auto hidden lg:block' />
        <h1 className='title-h3 lg:hidden sm:hidden'>{title}</h1>
        <span className='flex items-center justify-end'>
          {user ? <UserDropdown user={user} className='md:-mr-2 sm:mr-0' /> : <SignInButton variant='ghost' />}
        </span>
      </div>
    </header>
  )
}

function UserDropdown({ user, className }: { user: AccountsCurrentUserOutput; className?: string }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          'group flex items-center gap-3 whitespace-nowrap rounded-xl px-2 py-3 data-[state=open]:bg-grey-100 md:gap-1',
          className,
        )}
      >
        <AvatarIcon />
        <span className='text-large vertical-alignment-fix sm:hidden'>{user.username}</span>
        <ChevronDownIcon className='group-data-[state=open]:rotate-180' />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align='end'
        className='z-10 mt-1 min-w-[15.7rem] rounded-xl border border-black-80 bg-black-100 p-6'
      >
        <DropdownMenu.Label className='title-h3 text-white mb-1'>{user.username}</DropdownMenu.Label>
        <DropdownMenu.Label className='mb-6 border-b border-b-grey-100 pb-2 text-grey-20'>
          User@gmail.com
        </DropdownMenu.Label>
        <DropdownMenu.Item asChild>
          <GhostButton size='sm' className='mb-2 w-full justify-start pl-0'>
            <SettingIcon />
            Settings
          </GhostButton>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <LogoutButton className='pl-0' />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useUser()
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  if (!user) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GhostButton size='sm' className={className}>
          <LogoutIcon />
          Log out
        </GhostButton>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent aria-describedby={undefined}>
          <DialogTitle>Are you sure you want to log out?</DialogTitle>
          <DialogFooter className='sm:grid sm:grid-cols-2'>
            <DialogClose version='secondary'>Stay</DialogClose>
            <DialogClose
              version='primary'
              onClick={() => {
                setMobileMenuOpen(false)
                void logout()
              }}
            >
              Log out
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
