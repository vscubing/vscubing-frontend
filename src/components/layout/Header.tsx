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
    LogoutIcon,
    MenuIcon,
    SettingIcon,
} from '@/components/ui'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef, useState, type ReactNode } from 'react'
import { LogoWithLinkToLanding } from './components/Logo'
import { useSetAtom } from 'jotai'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { cn } from '@/utils'
import { logout, useUser } from '@/features/auth'
import { type AccountsCurrentUserOutput } from '@/api'
import { SignInButton } from '@/shared/SignInButton'
import { Slot } from '@radix-ui/react-slot'
import { Link } from '@tanstack/react-router'

type HeaderProps = { title?: ReactNode; className?: string }
export function Header({ title, className }: HeaderProps) {
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)
  const { data: user } = useUser()

  return (
    <header className={cn('z-40 flex bg-black-100/80 backdrop-blur-sm sm:pb-2 sm:pt-3', className)}>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className='mr-2 hidden h-[4.375rem] w-[4.375rem] items-center justify-center rounded-2xl bg-black-80/80 backdrop-blur-sm transition-all duration-300 hover:bg-black-80 hover:scale-105 active:scale-95 lg:flex sm:h-14 sm:w-14'
      >
        <MenuIcon />
      </button>
      <div className='flex h-[var(--header-height)] flex-1 items-center justify-between rounded-2xl bg-black-80/80 backdrop-blur-sm px-4 transition-all duration-300 hover:bg-black-80/90 lg:justify-end sm:pl-4 sm:pr-2'>
        <LogoWithLinkToLanding className='mr-auto hidden lg:block' />
        <h1 className='title-h3 lg:hidden sm:hidden'>{title}</h1>
        <span className='flex items-center justify-end'>
          {user ? (
            <UserDropdown user={user} className='md:-mr-2 sm:mr-0' />
          ) : (
            <SignInButton variant='ghost' />
          )}
        </span>
      </div>
    </header>
  )
}

function UserDropdown({
  user,
  className,
}: {
  user: AccountsCurrentUserOutput
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger
        className={cn(
          'group flex items-center gap-3 whitespace-nowrap rounded-xl px-2 py-3 transition-all duration-300 hover:bg-grey-100/80 hover:scale-105 active:scale-95 data-[state=open]:bg-grey-100/90 md:gap-1',
          className,
        )}
      >
        <AvatarIcon />
        <span className='text-large vertical-alignment-fix sm:hidden'>
          {user.username}
        </span>
        <ChevronDownIcon className='transition-transform duration-300 group-data-[state=open]:rotate-180' />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align='end'
        className='z-10 mt-1 min-w-[15.7rem] rounded-xl border border-black-80/50 bg-black-100/90 backdrop-blur-sm p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2'
      >
        <DropdownMenu.Label className='title-h3 text-white mb-1'>
          {user.username}
        </DropdownMenu.Label>
        <DropdownMenu.Label className='mb-6 border-b border-b-grey-100/50 pb-2 text-grey-20'>
          {user.email}
        </DropdownMenu.Label>
        <DropdownMenu.Group className='-ml-2 flex flex-col gap-2'>
          <DropdownButton className='w-full cursor-pointer' asChild>
            <DropdownMenu.Item asChild>
              <Link to='/settings'>
                <SettingIcon />
                Settings
              </Link>
            </DropdownMenu.Item>
          </DropdownButton>
          <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
            <LogoutButton
              className='w-full'
              onDialogClose={() => setIsOpen(false)}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

function LogoutButton({
  className,
  onDialogClose,
}: {
  className?: string
  onDialogClose: () => void
}) {
  const { data: user } = useUser()
  const setMobileMenuOpen = useSetAtom(mobileMenuOpenAtom)

  if (!user) {
    return null
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) onDialogClose()
      }}
    >
      <DropdownButton className={className} asChild>
        <DialogTrigger>
          <LogoutIcon />
          Log out
        </DialogTrigger>
      </DropdownButton>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-sm" />
        <DialogContent aria-describedby={undefined} className="bg-black-100/90 backdrop-blur-sm border-black-80/50">
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

const DropdownButton = forwardRef<
  HTMLButtonElement,
  { children: ReactNode; className?: string; asChild?: boolean }
>(({ children, className, asChild = false }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        'transition-all duration-300 outline-ring btn-sm inline-flex h-9 items-center gap-2 rounded-xl px-2 text-white-100 hover:bg-grey-100/80 hover:scale-105 active:scale-95 disabled:text-grey-60',
        className,
      )}
      ref={ref}
    >
      {children}
    </Comp>
  )
})
