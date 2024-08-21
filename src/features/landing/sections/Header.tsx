import { cn } from '@/utils'
import { useState, useEffect } from 'react'
import { Container } from '../components/Container'
import { Logo } from '@/components/ui'

export function Header() {
  const isWindowScrolled = useIsWindowScrolled()

  return (
    <header className={cn('fixed left-0 top-0 z-20 w-full')}>
      <Container>
        <div
          className={cn(
            'flex rounded-[1rem] bg-black-120 pl-9 pr-2 transition-all duration-100',
            isWindowScrolled ? 'items-center bg-black-80/75 py-2 backdrop-blur-lg ' : 'items-end pb-2 pt-9',
          )}
        >
          <div className='flex w-full items-center gap-[6.25rem]'>
            <a href='#'>
              <Logo variant='full' />
            </a>
            <nav className='vertical-alignment-fix flex gap-10 font-medium text-grey-40'>
              {/* TODO: add anchor links */}
              <a>About</a>
              <a>Features</a>
              <a>Guide</a>
              <a>Contacts</a>
            </nav>
            {/* <PrimaryButton asChild className='ml-auto h-14 px-10'> TODO: add show/hide logic */}
            {/*   <Link to='/'>Start cubing now</Link> */}
            {/* </PrimaryButton> */}
          </div>
        </div>
      </Container>
    </header>
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
