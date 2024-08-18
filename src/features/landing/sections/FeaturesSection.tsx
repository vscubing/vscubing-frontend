import { Container } from '../components/Container'
import { LeaderboardIcon, ResultIcon, ScrambleIcon, ShareIcon } from '../components/icons'
import { type ReactElement } from 'react'

export function FeaturesSection({ className }: { className: string }) {
  return (
    <Container className={className}>
      <section>
        <h2 className='landing-h2 mb-14 text-center'>The problem we solve</h2>
        <ul className='grid grid-cols-2 grid-rows-[18.75rem,18.75rem] gap-3'>
          <Feature
            title='Automated results'
            description='No more manual entering of results in Excel. Everything is automated!'
            renderIcon={() => <ResultIcon />}
            renderVisualization={() => 'visual'}
          />
          <Feature
            title='Instant scrambles'
            description='Get your scrambles without any manual copy-pasting.'
            renderIcon={() => <ScrambleIcon />}
            renderVisualization={() => 'visual'}
          />
          <Feature
            title='Leaderboards'
            description='Compete for top spots on both contest-wise and all-time leaderboards.'
            renderIcon={() => <LeaderboardIcon />}
            renderVisualization={() => 'visual'}
          />
          <Feature
            title='Share your solves'
            description='Easily share your solves with friends and challenge them to beat your time!'
            renderIcon={() => <ShareIcon />}
            renderVisualization={() => 'visual'}
          />
        </ul>
      </section>
    </Container>
  )
}

function Feature({
  title,
  description,
  renderIcon,
  renderVisualization,
}: {
  title: string
  description: string
  renderIcon: () => ReactElement
  renderVisualization: () => ReactElement
}) {
  return (
    <li className='flex flex-col rounded-3xl bg-black-100 px-10 pb-10'>
      <div className='flex flex-1 gap-28'>
        <div className='self-end pb-6'>{renderIcon()}</div>
        <div className='-mb-2 -mr-10 flex-1 border border-red-80'>{renderVisualization()}</div>
      </div>
      <h3 className='landing-h3 mb-2'>{title}</h3>
      <p>{description}</p>
    </li>
  )
}
