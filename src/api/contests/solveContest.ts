import { axiosClient } from '../axios'
import { Discipline, Scramble } from '@/types'
import { queryOptions, useMutation } from '@tanstack/react-query'
import { queryClient } from '../reactQuery'
import { contestResultsQuery } from '.'

export type SolveContestStateResponse = {
  currentSolve: {
    canChangeToExtra: boolean
    scramble: Scramble
    solve: SolveNotInited | SolveSuccessful | SolveDnf
  }
  submittedSolves: Array<(SolveSuccessful | SolveDnf) & { scramble: Scramble }>
}

type SolveNotInited = null
type SolveSuccessful = { id: number; timeMs: number; dnf: false }
type SolveDnf = { id: number; timeMs: null; dnf: true }

const API_ROUTE = '/contests/solve-contest/'
export const SOLVE_CONTEST_STATE_QUERY_KEY = 'solveContestState'

export const solveContestStateQuery = (contestNumber: number, discipline: Discipline) =>
  queryOptions({
    queryKey: [SOLVE_CONTEST_STATE_QUERY_KEY, { contestNumber, discipline }],
    queryFn: async () => {
      const res = await axiosClient.get<SolveContestStateResponse>(`${API_ROUTE}${contestNumber}/${discipline}/`)
      return res.data
    },
  })

export const usePostSolveResult = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async ({
      scrambleId,
      result,
    }: {
      scrambleId: number
      result: { reconstruction: string; timeMs: number; dnf: false } | { dnf: true; timeMs: null }
    }) => {
      const res = await axiosClient.post<{ solveId: number }>(
        `${API_ROUTE}${contestNumber}/${discipline}/?scramble_id=${scrambleId}`,
        result,
      )

      const query = solveContestStateQuery(contestNumber, discipline)
      const previousState = await queryClient.fetchQuery(query)
      queryClient.setQueryData(query.queryKey, {
        ...previousState,
        currentSolve: { ...previousState.currentSolve, solve: { id: res.data.solveId, ...result } },
      })
    },
  })

export const useSubmitSolve = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data } = await axiosClient.put<SolveContestStateResponse | { detail: 'contest submitted' }>(
        `${API_ROUTE}${contestNumber}/${discipline}/?action=submit`,
      )

      const roundFinished = 'detail' in data
      if (roundFinished) {
        queryClient.invalidateQueries(contestResultsQuery(contestNumber, discipline))
        return
      }
      const newSolvesState = data

      const query = solveContestStateQuery(contestNumber, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })

export const useChangeToExtra = (contestNumber: number, discipline: Discipline) =>
  useMutation({
    mutationFn: async () => {
      const { data: newSolvesState } = await axiosClient.put<SolveContestStateResponse>(
        `${API_ROUTE}${contestNumber}/${discipline}/?action=change_to_extra`,
      )

      const query = solveContestStateQuery(contestNumber, discipline)
      queryClient.setQueryData(query.queryKey, newSolvesState)
    },
  })
