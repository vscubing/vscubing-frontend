import { Discipline, getOngoingContestNumber, useContestData } from '@/api'
import { ReconstructTimeButton } from '@/components'
import { groupBy } from '@/utils'
import { useMemo } from 'react'
import { redirect, useParams } from 'react-router-dom'

export const redirectToOngoingContest = async () => {
  const ongoing = await getOngoingContestNumber()
  return redirect(`${ongoing}`)
}

export const DEFAULT_DISCIPLINE = '3by3'

export const ContestPage = () => {
  const routeParams = useParams<{ contestNumber: string; discipline: Discipline }>()

  if (!routeParams.contestNumber || !routeParams.discipline) throw Error('no contest number or discipline')

  const { data: solves, isError } = useContestData(Number(routeParams.contestNumber), routeParams.discipline)
  const grouppedSolves = useMemo(() => groupBy(solves ?? [], (attempt) => attempt.username), [solves])

  if (isError) {
    return 'mock data not available'
  }

  if (!solves) {
    return 'loading...'
  }

  return (
    <>
      <div className='text-left'>{routeParams.discipline}</div>
      {Object.entries(grouppedSolves).map(([username, solves]) => (
        <div key={username} className='flex gap-2'>
          <span>{username}</span>
          {solves.map(({ id, time_ms }) => (
            <ReconstructTimeButton key={id} solveId={id} time_ms={time_ms} />
          ))}
        </div>
      ))}
    </>
  )
}
