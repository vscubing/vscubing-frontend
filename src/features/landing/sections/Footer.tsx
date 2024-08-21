import { ChevronLeftIcon, DiscordIcon, GithubIcon, LinkedinIcon, Logo, SecondaryButton } from '@/components/ui'
import { Container } from '../components/Container'
import { cn } from '@/utils'
import footerBgCubes from '../assets/footer/footer-bg-cubes.svg'

export function Footer({
  className,
  navigationAnchors,
}: {
  className: string
  navigationAnchors: { id: string; name: string }[]
}) {
  return (
    <Container className={cn('pb-[1.625rem]', className)}>
      <footer className='relative overflow-clip rounded-3xl px-[1.625rem] pb-[4.75rem] pt-10 [background:linear-gradient(180deg,#060709_0%,#494C74_100%)]'>
        <img
          src={footerBgCubes}
          loading='lazy'
          alt=''
          className='absolute bottom-0 right-0 w-full object-contain object-right-bottom'
        />
        <div className='relative'>
          <div className='mb-7 flex items-center justify-between'>
            <Logo variant='full' className='w-[38.5rem]' />
            <SecondaryButton asChild className='h-11 w-11 px-0 [&>svg]:h-6 [&>svg]:w-6'>
              <a href='#'>
                <ChevronLeftIcon className='rotate-90' />
              </a>
            </SecondaryButton>
          </div>
          <div className='flex gap-3'>
            <div className='w-[19.125rem]'>
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
            <div className='w-[21.125rem]'>
              <h2 className='landing-h3 mb-4'>Quick links</h2>
              <nav className='flex flex-col gap-2 font-medium'>
                {navigationAnchors.map(({ id, name }) => (
                  <a href={`#${id}`}>{name}</a>
                ))}
              </nav>
            </div>
            <div className='flex-1'>
              <h2 className='landing-h3 mb-4'>Creators</h2>
              <ul className='flex flex-col gap-2 font-medium'>
                <li>
                  <a href='https://www.linkedin.com/in/bohdan-chornokondratenko-98075b202/'>
                    Bohdan Chornokondratenko - Frontend Developer
                  </a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/anton-savytskyi/'>Anton Savytskyi - Backend Developer</a>
                </li>
                <li>
                  <a href='https://www.linkedin.com/in/olesiapetryk/'>Olesia Petryk - UX/UI Designer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  )
}
