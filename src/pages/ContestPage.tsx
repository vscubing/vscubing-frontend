import { Discipline, getOngoingContestNumber, useContestResults } from '@/api'
import { groupBy } from '@/utils'
import { useMemo } from 'react'
import { redirect, useParams } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { ContestResult } from '@/features/contest'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const ContestPage = () => {
  const routeParams = useParams<{ contestNumber: string; discipline: Discipline }>()
  const contestNumber = routeParams.contestNumber === undefined ? undefined : Number(routeParams.contestNumber)
  const discipline = routeParams.discipline

  if (!contestNumber || !discipline) throw Error('no contest number or discipline')

  const { data: results, isError } = useContestResults(contestNumber, discipline)
  const grouppedResults = useMemo(() => groupBy(results ?? [], (attempt) => attempt.username), [results])

  if (isError) {
    return 'mock data not available'
  }

  if (!results) {
    return 'loading...'
  }

  return (
    <>
      <div className='mb-[26px] flex h-[52px] w-[72px] items-center justify-center rounded-[5px] bg-primary'>
        <CubeIcon className='w-[23px] text-white' />
      </div>
      {Object.entries(grouppedResults).map(([username, solves]) => (
        <ContestResult username={username} solves={solves} />
      ))}
    </>
  )
}
