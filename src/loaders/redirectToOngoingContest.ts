import { getOngoingContestNumber } from '@/api/contests'
import { redirect } from 'react-router-dom'

export async function redirectToOngoingContest() {
  const ongoing = await getOngoingContestNumber()
  return redirect(String(ongoing))
}
