import { type AxiosError } from 'axios'
import { defineConfig } from 'orval'
export default defineConfig({
  api: {
    input: 'http://127.0.0.1:8000/api/schema/',
    output: {
      indexFiles: true,
      target: './gen',
      mode: 'split',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: { path: 'orval.axiosInstance.ts' },
        operations: {
          accountsCurrentUserRetrieve: {
            operationName: (_operation, _route, verb) => `${verb}User`,
          },
        },
        query: {
          options: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            staleTime: Infinity,
            retry: (_: unknown, err: AxiosError) =>
              err?.response?.status !== 403 &&
              err?.response?.status !== 401 &&
              err?.response?.status !== 404 &&
              err?.response?.status !== 400,
          },
        },
      },
    },
  },
})
