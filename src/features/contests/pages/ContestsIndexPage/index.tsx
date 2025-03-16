import { Header, SectionHeader } from '@/components/layout'
import { CubeSwitcher, OverlaySpinner } from '@/components/ui'
import { Link, getRouteApi } from '@tanstack/react-router'
import { matchesQuery } from '@/utils'
import type { ContestDTO } from '@/types'
import { type ReactNode } from 'react'
import { ContestsListHeader } from './ContestsListHeader'
import { AutofillHeight } from '@/shared/autofillHeight'

import { ContestRowSkeleton as ContestSkeletonDesktop, ContestRow as ContestDesktop } from './Contest'
import {
  Contest as ContestMobile,
  ContestSkeleton as ContestSkeletonMobile,
  getInfiniteContestsQuery,
  useAvailableDisciplines,
} from '@/shared/contests'
import { NotFoundHandler } from '@/shared/ErrorHandlers'
import { HintSection } from '@/shared/HintSection'
import { NavigateBackButton } from '@/shared/NavigateBackButton'
import { PageTitleMobile } from '@/shared/PageTitleMobile'

const Contest = matchesQuery('sm') ? ContestMobile : ContestDesktop
const ContestSkeleton = matchesQuery('sm') ? ContestSkeletonMobile : ContestSkeletonDesktop

const route = getRouteApi('/_app/contests/')
export function ContestsIndexPage() {
  const { discipline } = route.useSearch()

  const query = getInfiniteContestsQuery({
    pageSize: 20,
    disciplineSlug: discipline,
  })
  const { data, isFetching, isLoading, error, lastElementRef } = AutofillHeight.useInfiniteScroll(query)
  const isFetchingNotFirstPage = isFetching && !isLoading

  return (
    <NotFoundHandler error={error}>
      <OverlaySpinner isVisible={isFetchingNotFirstPage} />
      <View discipline={discipline}>
        <ContestsList contests={data?.pages.flatMap((page) => page.results)} lastElementRef={lastElementRef} />
      </View>
    </NotFoundHandler>
  )
}

type ViewProps = {
  discipline: string
  children: ReactNode
}
function View({ discipline: currentDiscipline, children }: ViewProps) {
  const title = 'Explore contests'
  const { data: availableDisciplines } = useAvailableDisciplines()
  return (
    <section className='flex flex-1 flex-col gap-3 sm:gap-2'>
      <Header title={title} />
      <PageTitleMobile>{title}</PageTitleMobile>
      <NavigateBackButton className='self-start' />
      <SectionHeader>
        <div className='flex gap-3'>
          {availableDisciplines?.map(({ slug: discipline }) => (
            <Link to='/contests' search={{ page: 1, discipline }} key={discipline}>
              <CubeSwitcher asButton={false} cube={discipline} isActive={discipline === currentDiscipline} />
            </Link>
          ))}
        </div>
      </SectionHeader>
      {children}
    </section>
  )
}

function ContestsList({
  contests,
  lastElementRef,
}: {
  contests?: ContestDTO[]
  lastElementRef?: (node?: Element | null) => void
}) {
  const { discipline } = route.useSearch()
  if (contests?.length === 0) {
    return (
      <HintSection>
        <p>
          While this page may be empty now, it's brimming with potential for thrilling contests that will soon fill this
          space.
        </p>
      </HintSection>
    )
  }

  return (
    <div className='flex flex-1 flex-col gap-1 rounded-2xl bg-black-80 p-6 sm:p-3'>
      <ContestsListHeader className='sm:hidden' />

      {contests ? (
        <ul className='flex flex-1 flex-col gap-2'>
          {contests.map((contest, index) => (
            <li key={contest.id} ref={index === contests.length - 1 ? lastElementRef : undefined}>
              <Contest discipline={discipline} contest={contest} />
            </li>
          ))}
        </ul>
      ) : (
        <AutofillHeight.ListSkeleton
          className='flex flex-1 flex-col gap-2'
          renderSkeletonItem={() => <ContestSkeleton />}
        />
      )}
    </div>
  )
}
