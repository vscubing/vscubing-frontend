import { usePastContestData } from '@/api'

export const Contest = () => {
  // const { contestId, discipline } = useParams() // TODO fix when backend works
  const contestId = '3'
  const discipline = '3by3'

  const { data } = usePastContestData(contestId, discipline)

  console.log(data)
  return <div>{contestId}</div>
}
