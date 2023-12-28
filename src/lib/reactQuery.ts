import { QueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: Infinity,
      retry: (_, err) => err.response?.status !== 403 && err.response?.status !== 401 && err.response?.status !== 404,
    },
  },
})

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError
  }
}
