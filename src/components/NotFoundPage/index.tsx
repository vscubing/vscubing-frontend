import { Link } from '@tanstack/react-router'
import { Layout } from '../layout'
import { PrimaryButton } from '../ui'
import { Suspense, lazy, type ReactNode } from 'react'
import { cn, matchesQuery } from '@/utils'

const ParallaxCubesWrapper = lazy(() => import('./ParallaxCubes.lazy'))

export function NotFoundPage() {
  return (
    <Suspense fallback={<PageContent />}>
      <ParallaxCubesWrapper>
        {(renderParallaxCubes) => <PageContent renderParallaxCubes={renderParallaxCubes} />}
      </ParallaxCubesWrapper>
    </Suspense>
  )
}

type NotFoundInnerProps = { renderParallaxCubes?: () => ReactNode }
function PageContent({ renderParallaxCubes }: NotFoundInnerProps) {
  return (
    <Layout>
      <div className='relative flex-1 rounded-xl bg-black-80 p-16 sm:my-3 sm:p-8'>
        {renderParallaxCubes?.()}
        <div className='relative max-w-[35rem]'>
          <p className='title-lg mb-4'>Lost in cuberspace?</p>
          <p className='text-large mb-8 inline-block'>
            Sorry, the page you're looking for seems to have gone on a digital adventure of its own
          </p>
          <Link to='/'>
            <PrimaryButton className='sm:w-full' size={matchesQuery('sm') ? 'sm' : 'lg'}>
              Go back to dashboard
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
