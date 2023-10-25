import { Discipline } from '@/types'

type SolveContestProps = { contestNumber: number; discipline: Discipline }
export const SolveContest = ({ contestNumber, discipline }: SolveContestProps) => {
  return (
    <div>
      solve contest {contestNumber}! discipline {discipline}
    </div>
  )
}
