import { cn } from '@/utils'
import { useState, useEffect } from 'react'
import { Container } from '../shared/Container'
import { Logo } from '@/components/ui'
import { DynamicLinkToApp } from '../shared/LinkToApp'

export function Header({ navigationAnchors }: { navigationAnchors: { id: string; name: string }[] }) {
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
            <nav className='vertical-alignment-fix flex gap-10'>
              {navigationAnchors.map(({ id, name }) => (
                <a key={id} href={`#${id}`} className='transition-base font-medium text-grey-40 hover:text-white-100'>
                  {name}
                </a>
              ))}
            </nav>
            <DynamicLinkToApp className='ml-auto h-14 px-10' />
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
