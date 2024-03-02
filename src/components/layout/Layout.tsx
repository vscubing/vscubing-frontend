import { Outlet } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { Logo, Navbar } from './components'
import { PickUsernameModal } from '../PickUsernameModal'
import { cn } from '@/utils'
import * as Dialog from '@radix-ui/react-dialog'
import { CloseIcon, DiscordIcon, GhostButton, GithubIcon, LinkedinIcon, LogoutIcon } from '../ui'
import { mobileMenuOpenAtom } from './store/mobileMenuOpenAtom'
import { userQuery, logout } from '@/features/auth'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/AlertDialog'
import { useQuery } from '@tanstack/react-query'
import { AlertDialogFooter } from '../AlertDialog'

export function Layout() {
  return (
    <>
      <PickUsernameModal />
      <MobileMenu />
      <div className='flex min-h-screen gap-3 p-[1.625rem]'>
        <Sidebar className='md:hidden' />
        <main className='contents'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

function Sidebar({ className }: { className?: string }) {
  return (
    <>
      <aside className={cn('flex w-[clamp(16rem,20vw,21rem)] flex-col gap-3 lg-short:min-w-[19rem]', className)}>
        <Logo className='h-[7rem] md:hidden lg-short:h-[4.375rem]' />
        <div className='flex flex-1 flex-col justify-between rounded-2xl bg-black-80 py-6'>
          <Navbar />
          <div>
            <div className='flex flex-col items-center gap-4 lg-short:flex-row lg-short:justify-center lg-short:gap-1'>
              <SocialLinks />
              {/* TODO: animate the social links to slide up after login before the log out button appears */}
              <LogoutButton />
            </div>
            <Copyright className='mt-6' />
          </div>
        </div>
      </aside>
    </>
  )
}

function MobileMenu() {
  const [open, setOpen] = useAtom(mobileMenuOpenAtom)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className='fixed inset-[calc(1.625rem-1px)] z-50 flex flex-col rounded-2xl bg-black-80 pb-6 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
          <div className='flex justify-end p-3'>
            <Dialog.Close className='flex h-11 w-11 items-center justify-center'>
              <CloseIcon />
            </Dialog.Close>
          </div>
          <Navbar onItemSelect={() => setOpen(false)} /> {/* TODO: close on click on active navigation item */}
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

function Copyright({ className }: { className?: string }) {
  return <p className={cn('text-caption text-center text-white-100', className)}>© Virtual Speedcubing, 2023</p>
}

function LogoutButton({ className }: { className?: string }) {
  const { data: user } = useQuery(userQuery)

  if (user === undefined || user.isAuthed === false) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <GhostButton className={className}>
          Log out <LogoutIcon />
        </GhostButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction onClick={() => logout()}>Log out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center gap-4 lg-short:gap-1', className)}>
      {[
        { href: 'https://github.com/vscubing', children: <GithubIcon /> },
        { href: 'https://www.linkedin.com/company/vscubing', children: <LinkedinIcon /> },
        { href: '#', children: <DiscordIcon /> } /* TODO: add discord link */,
      ].map(({ href, children }) => (
        <a
          href={href}
          key={href}
          className='transition-base outline-ring flex h-11 w-11 items-center justify-center text-[1.5rem] text-grey-20 hover:text-primary-80'
        >
          {children}
        </a>
      ))}
    </div>
  )
}
