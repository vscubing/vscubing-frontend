import { ReconstructTimeButton } from '@/components'
import { Discipline } from '@/types'
import { useRequiredParams } from '@/utils'
import { useReconstructor } from '../reconstructor'
import { Link } from 'react-router-dom'
import { useLeaderboard, LeaderboardResponse } from '@/api/contests'
import { useAuth } from '../auth'
import classNames from 'classnames'

export const LeaderboardDiscipline = () => {
  const { userData } = useAuth()
  const routeParams = useRequiredParams<{ discipline: string }>()
  const discipline = routeParams.discipline as Discipline // TODO add type guard

  const { data: results } = useLeaderboard(discipline)

  if (!results) {
    return 'loading...'
  }

  const ownResult = userData && results.find((result) => result.user.username === userData.username)

  return (
    <>
      {ownResult && <LeaderboardResult {...ownResult} index={results.indexOf(ownResult)} isOwnResult />}
      {results.map((result, index) => (
        <LeaderboardResult {...result} index={index} />
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
  index,
  isOwnResult,
}: LeaderboardResponse[number] & { index: number; isOwnResult?: boolean }) => {
  const { showReconstruction } = useReconstructor()
  const dateString = formatSolveDate(created)

  return (
    <div
      key={id}
      className={classNames(
        isOwnResult ? 'bg-[#233D50]' : 'bg-panels',
        'mb-[26px] grid grid-cols-[40px_1fr_repeat(3,min-content)] items-center gap-[8px] rounded-[5px] py-[12px] pl-[10px] pr-[56px] last:mb-0',
      )}
    >
      <span className='pr-[5px] text-right'>{index + 1}.</span>
      <span>{username}</span>
      <div className='mr-[20px] border-r-[1px] border-[#A0A0A0]/50 pr-[20px]'>
        <ReconstructTimeButton onClick={() => showReconstruction(id)} time_ms={time_ms} />
      </div>
      <span className='w-[110px] pr-[30px]'>{dateString}</span>
      <Link className='btn-action' to={`/contest/${contest_number}/${discipline.name}`}>
        contest
      </Link>
    </div>
  )
}

export const formatSolveDate = (dateStr: string) => {
  const date = new Date(dateStr)
  let dd = String(date.getDate())
  if (dd.length === 1) {
    dd = `0${dd}`
  }

  const mm = String(date.getMonth())
  const yyyy = String(date.getFullYear())
  return `${dd}.${mm}.${yyyy}`
}
