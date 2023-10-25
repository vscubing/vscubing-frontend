import { groupBy } from '@/utils'
import { useMemo } from 'react'
import { redirect, useParams } from 'react-router-dom'
import CubeIcon from '@/assets/3by3.svg?react'
import { ContestResult, SolveContest } from '@/features/contest'
import { Discipline } from '@/types'
import { getOngoingContestNumber, useContestResults } from '@/api/contests'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const ContestPage = () => {
  const routeParams = useParams<{ contestNumber: string; discipline: Discipline }>()
  const contestNumber = routeParams.contestNumber === undefined ? undefined : Number(routeParams.contestNumber)
  const discipline = routeParams.discipline

  if (!contestNumber || !discipline) throw Error('no contest number or discipline')

  const { data: results, error } = useContestResults(contestNumber, discipline)
  const grouppedResults = useMemo(() => groupBy(results ?? [], (attempt) => attempt.username), [results])

  if (error?.response.status === 403) {
    return <SolveContest contestNumber={contestNumber} discipline={discipline} />
  }

  if (error?.response.status === 401) {
    return "unauthorized, can't solve"
  }

  if (error) {
    return 'unknown error'
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
        <ContestResult key={username} username={username} solves={solves} />
      ))}
    </>
  )
}
