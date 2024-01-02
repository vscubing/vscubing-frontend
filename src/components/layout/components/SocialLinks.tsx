import { GithubIcon, LinkedinIcon, DiscordIcon } from '@/components/ui'

export function SocialLinks() {
  return (
    <div className='lg-short:gap-1 flex justify-center gap-4'>
      {[
        { href: 'https://github.com/vscubing', children: <GithubIcon /> },
        { href: 'https://www.linkedin.com/company/vscubing', children: <LinkedinIcon /> },
        { href: '#', children: <DiscordIcon /> } /* TODO: add discord link */,
      ].map(({ href, children }) => (
        <a
          href={href}
          key={href}
          className='transition-base outline-ring flex h-11 w-11 items-center justify-center text-[1.5rem] hover:text-primary-100'
        >
          {children}
        </a>
      ))}
    </div>
  )
}
