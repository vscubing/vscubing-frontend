import { ReactNode } from '@tanstack/react-router'
import { Container } from '../components/Container'
import { LeaderboardIcon, ResultIcon, ScrambleIcon, ShareIcon } from '../components/icons'

export function FeaturesSection({ className }: { className: string }) {
  return (
    <Container className={className}>
      <section>
        <h2 className='landing-h2 mb-14 text-center'>The problem we solve</h2>
        <ul className='grid grid-cols-2 grid-rows-[18.75rem,18.75rem] gap-3'>
          <Feature
            title='Automated results'
            description='No more manual entering of results in Excel. Everything is automated!'
            icon={<ResultIcon />}
            visualization='visual'
          />
          <Feature
            title='Instant scrambles'
            description='Get your scrambles without any manual copy-pasting.'
            icon={<ScrambleIcon />}
            visualization='visual'
          />
          <Feature
            title='Leaderboards'
            description='Compete for top spots on both contest-wise and all-time leaderboards.'
            icon={<LeaderboardIcon />}
            visualization='visual'
          />
          <Feature
            title='Share your solves'
            description='Easily share your solves with friends and challenge them to beat your time!'
            icon={<ShareIcon />}
            visualization='visual'
          />
        </ul>
      </section>
    </Container>
  )
}

function Feature({
  title,
  description,
  icon,
  visualization,
}: {
  title: string
  description: string
  icon: ReactNode
  visualization: ReactNode
}) {
  return (
    <li className='flex flex-col rounded-3xl bg-black-100 px-10 pb-10'>
      <div className='flex flex-1 gap-28'>
        <div className='self-end pb-6'>{icon}</div>
        <div className='-mb-2 -mr-10 flex-1 border border-red-80'>{visualization}</div>
      </div>
      <h3 className='landing-h3 mb-2'>{title}</h3>
      <p>{description}</p>
    </li>
  )
}
