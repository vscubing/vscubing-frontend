import { ReconstructTimeButton, ResultCard } from '@/components'
import { Discipline } from '@/types'
import { useRequiredParams } from '@/utils'
import { Link } from 'react-router-dom'
import { useLeaderboard, LeaderboardResponse } from '@/api/contests'
import { useUser } from '@/api/accounts'
import { useReconstructor } from '@/integrations/reconstructor'

export const LeaderboardDiscipline = () => {
  const { userData } = useUser()
  const routeParams = useRequiredParams<{ discipline: string }>()
  const discipline = routeParams.discipline as Discipline // TODO add type guard

  const { data: results } = useLeaderboard(discipline)

  if (!results) {
    return 'loading...'
  }

  const ownResult = userData && results.find((result) => result.user.username === userData.username)

  return (
    <>
      {ownResult && <LeaderboardResult {...ownResult} placeNumber={results.indexOf(ownResult) + 1} isOwnResult />}
      {results.map((result, index) => (
        <LeaderboardResult {...result} placeNumber={index + 1} key={result.id} />
      ))}
    </>
  )
}

const LeaderboardResult = ({
  user: { username },
  id,
  time_ms,
  created,
  contest: { contest_number },
  discipline,
  placeNumber,
  isOwnResult,
}: LeaderboardResponse[number] & { placeNumber: number; isOwnResult?: boolean }) => {
  const { showReconstruction } = useReconstructor()
  const dateString = formatSolveDate(created)

  return (
    <ResultCard
      kind={isOwnResult ? 'highlighted' : 'default'}
      className='mb-3 grid grid-cols-2 items-center px-4 last:mb-0 md:mb-6 md:grid-cols-[1fr_min-content_min-content] md:gap-2'
    >
      <div className='flex gap-2 md:-ml-2 lg:-ml-5 lg:gap-3'>
        <span className='text-right md:w-[30px]'>{placeNumber}.</span>
        <span>{username}</span>
      </div>
      <div className='flex justify-end border-[#A0A0A0]/50 md:mr-[20px] md:justify-start md:border-r-[1px] md:pr-[20px]'>
        <ReconstructTimeButton onClick={() => showReconstruction(id)} time_ms={time_ms} />
      </div>
      <div className='col-span-full flex items-center justify-between md:col-span-1 md:justify-start'>
        <span className='w-[110px] pr-[30px]'>{dateString}</span>
        <Link
          className='btn-action w-[70px] text-center md:w-auto'
          to={`/contest/${contest_number}/${discipline.name}`}
        >
          contest
        </Link>
      </div>
    </ResultCard>
  )
}

const formatSolveDate = (dateStr: string) => {
  const date = new Date(dateStr)
  let dd = String(date.getDate())
  if (dd.length === 1) {
    dd = `0${dd}`
  }

  const mm = String(date.getMonth())
  const yyyy = String(date.getFullYear())
  return `${dd}.${mm}.${yyyy}`
}
