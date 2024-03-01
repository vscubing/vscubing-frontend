import { GithubIcon, LinkedinIcon, DiscordIcon } from '@/components/ui'
import { cn } from '@/utils'

export function SocialLinks({ className }: { className?: string }) {
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
