import { ChevronLeftIcon, DiscordIcon, GithubIcon, LinkedinIcon, Logo, SecondaryButton } from '@/components/ui'
import { Container } from '../components/Container'
import { cn } from '@/utils'

export function Footer({ className }: { className: string }) {
  return (
    <Container className={cn('pb-[1.625rem]', className)}>
      <footer className='rounded-3xl px-[1.625rem] pb-[1.625rem] pt-10 [background:linear-gradient(180deg,#060709_0%,#494C74_100%)]'>
        <div className='flex items-center justify-between'>
          <Logo variant='full' className='w-[38.5rem]' />
          <SecondaryButton asChild className='h-11 w-11 px-0 [&>svg]:h-6 [&>svg]:w-6'>
            <a href='#'>
              <ChevronLeftIcon className='rotate-90' />
            </a>
          </SecondaryButton>
        </div>
        <div className='flex'>
          <div>
            <div className='mb-2 pl-2'>
              <h2 className='landing-h3 mb-4'>Have questions?</h2>
              <p>Reach out to us at</p>
            </div>
            <div className='flex gap-2'>
              {[
                { href: 'https://github.com/vscubing', children: <GithubIcon /> },
                { href: 'https://www.linkedin.com/company/vscubing', children: <LinkedinIcon /> },
                { href: 'https://discord.gg/PxFrW9vTAy', children: <DiscordIcon /> },
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
          </div>
        </div>
      </footer>
    </Container>
  )
}
