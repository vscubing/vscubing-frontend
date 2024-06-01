import { defineConfig } from 'orval'
export default defineConfig({
  api: {
    input: 'http://127.0.0.1:8000/api/schema/',
    output: {
      indexFiles: true,
      target: './gen',
      mode: 'split',
      prettier: true,
      override: {
        mutator: 'axiosInstance.ts',
        operations: {
          accountsCurrentUserRetrieve: {
            operationName: (_operation, _route, verb) => `${verb}User`,
          },
        },
      },
    },
  },
})
