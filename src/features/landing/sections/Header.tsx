import { cn } from '@/utils'
import { useState, useEffect } from 'react'
import { Container } from '../shared/Container'
import { CloseIcon, Logo, MenuIcon } from '@/components/ui'
import { DynamicLinkToApp } from '../shared/LinkToApp'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function Header({ navigationAnchors }: { navigationAnchors: { id: string; name: string }[] }) {
  const isWindowScrolled = useIsWindowScrolled()

  return (
    <header className={cn('fixed left-0 top-0 z-20 w-full')}>
      <Container>
        <div
          className={cn(
            'flex rounded-3xl pl-9 pr-2 transition-all duration-300 md:pr-4',
            isWindowScrolled
              ? 'items-center glass-effect hover-glow'
              : 'items-end pb-2 pt-9 md:pt-[1.625rem] bg-black-120',
          )}
        >
          <div className='flex w-full items-center gap-[6.25rem] lg:gap-20'>
            <a href='#' className='group'>
              <Logo variant='full' className='group-hover:scale-105 transition-transform duration-300' />
            </a>
            <nav className='vertical-alignment-fix flex gap-10 md:hidden'>
              {navigationAnchors.map(({ id, name }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className='transition-base text-[1.125rem] font-medium text-grey-40 hover:text-white-100 hover-lift'
                >
                  {name}
                </a>
              ))}
            </nav>
            <DynamicLinkToApp className='ml-auto h-14 px-10 md:hidden hover-lift' />
            <MobileMenu className='ml-auto hidden md:flex' navigationAnchors={navigationAnchors} />
          </div>
        </div>
      </Container>
    </header>
  )
}

function MobileMenu({
  className,
  navigationAnchors,
}: {
  className: string
  navigationAnchors: { id: string; name: string }[]
}) {
  return (
    <DialogPrimitive.Dialog>
      <DialogPrimitive.Trigger
        className={cn('h-[44px] w-[44px] items-center justify-center text-white-100 hover-lift', className)}
      >
        <MenuIcon className='group-hover:rotate-90 transition-transform duration-300' />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className='fixed inset-0 z-20 flex flex-col gap-3 bg-black-120/95 backdrop-blur-lg p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
        >
          <div className='flex items-center justify-between rounded-3xl glass-effect hover-glow px-4 py-2'>
            <Logo variant='full' className='group-hover:scale-105 transition-transform duration-300' />
            <DialogPrimitive.Close className='h-[44px] w-[44px] items-center justify-center hover-lift'>
              <CloseIcon className='group-hover:rotate-90 transition-transform duration-300' />
            </DialogPrimitive.Close>
          </div>
          <div className='flex flex-1 flex-col items-center gap-11 rounded-b-3xl pt-6 text-[1rem] text-grey-40 bg-gradient-animated'>
            {navigationAnchors.map(({ id, name }) => (
              <DialogPrimitive.Close asChild key={id}>
                <a 
                  href={`#${id}`} 
                  className='py-1 font-medium hover:text-white-100 hover-lift transition-all duration-300'
                >
                  {name}
                </a>
              </DialogPrimitive.Close>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Dialog>
  )
}

function useIsWindowScrolled() {
  const [isWindowScrolled, setIsWindowScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 20) {
        setIsWindowScrolled(true)
      } else {
        setIsWindowScrolled(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return isWindowScrolled
}
