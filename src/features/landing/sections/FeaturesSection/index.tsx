import { ReactNode } from '@tanstack/react-router'
import { Container } from '../../shared/Container'
import { LeaderboardIcon, ResultIcon, ScrambleIcon, ShareIcon } from '../../shared/icons'
import { AnimationsController, BlockIntersectionWrapper, AnimationItem } from './animations'
import { ResultsAnimation } from './ResultsAnimation'
import { ScramblesAnimation } from './ScramblesAnimation'
import { LeaderboardsAnimation } from './LeaderboardsAnimation'

export type BlockType = 'results' | 'scrambles' | 'leaderboards' | 'sharing'
export function FeaturesSection({ className, id }: { className: string; id: string }) {
  return (
    <Container className={className}>
      <section id={id} className='landing-offset-anchor'>
        <h2 className='landing-h2 mb-14 text-center'>The problem we solve</h2>
        <AnimationsController>
          <ul className='grid grid-cols-2 grid-rows-[repeat(2,20rem)] gap-3'>
            <BlockIntersectionWrapper block='results'>
              <Feature
                title='Automated results'
                description='No more manual entering of results in Excel. Everything is automated!'
                icon={<ResultIcon />}
                visualization={<ResultsAnimation />}
              />
            </BlockIntersectionWrapper>
            <BlockIntersectionWrapper block='scrambles'>
              <Feature
                title='Instant scrambles'
                description='Get your scrambles without any manual copy-pasting.'
                icon={<ScrambleIcon />}
                visualization={<ScramblesAnimation />}
              />
            </BlockIntersectionWrapper>
            <BlockIntersectionWrapper block='leaderboards'>
              <Feature
                title='Leaderboards'
                description='Compete for top spots on both contest-wise and all-time leaderboards.'
                icon={<LeaderboardIcon />}
                visualization={<LeaderboardsAnimation />}
              />
            </BlockIntersectionWrapper>
            <BlockIntersectionWrapper block='sharing'>
              <Feature
                title='Share your solves'
                description='Easily share your solves with friends and challenge them to beat your time!'
                icon={<ShareIcon />}
                visualization={<FakeAnimation block='sharing' />}
              />
            </BlockIntersectionWrapper>
          </ul>
        </AnimationsController>
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
    <li className='flex h-full flex-col rounded-3xl bg-black-100 px-10 pb-10'>
      <div className='flex flex-1 gap-28'>
        <div className='self-end pb-6'>{icon}</div>
        <div className='-mb-2 -ml-2 -mr-10 flex-1 border border-red-80'>{visualization}</div>
      </div>
      <h3 className='landing-h3 mb-2'>{title}</h3>
      <p>{description}</p>
    </li>
  )
}

function FakeAnimation({ block }: { block: BlockType }) {
  return <AnimationItem block={block} className='animate-fake h-full w-full'></AnimationItem>
}
