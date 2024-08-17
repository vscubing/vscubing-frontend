import { Logo } from '@/components/layout/components'
import { cn } from '@/utils'
import { useState, useEffect } from 'react'
import { Container } from '../components/Container'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      if (window.scrollY >= 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('fixed left-0 top-0 z-10 w-full')}>
      <Container>
        <div
          className={cn(
            'flex rounded-[1rem] bg-black-120 pl-9 pr-2 transition-all duration-100',
            isScrolled ? 'items-center bg-black-80/75 py-2 backdrop-blur-lg ' : 'items-end pb-2 pt-9',
          )}
        >
          <div className='flex w-full items-center gap-[6.25rem]'>
            <Logo />
            <nav className='vertical-alignment-fix flex gap-10 font-bold text-grey-40'>
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
