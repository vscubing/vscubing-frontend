import { Link } from '@tanstack/react-router'
import { Header, Layout } from '@/components/layout'
import { PrimaryButton } from '@/components/ui'
import { Suspense, lazy, type ReactNode } from 'react'
import { matchesQuery } from '@/utils'

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
      <div className='flex flex-1 flex-col gap-3 sm:gap-0'>
        <Header className='hidden lg:block' />
        <div className='relative flex-1 rounded-xl bg-black-80 p-16 sm:p-8'>
          {renderParallaxCubes?.()}
          <div className='relative max-w-[35rem] sm:max-w-none'>
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
      </div>
    </Layout>
  )
}
