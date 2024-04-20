import { axiosClient } from '@/lib/axios'
import { createApiClient } from './schema'
import { ZodiosHooks } from '@zodios/react'

export const apiClient = createApiClient('', { axiosInstance: axiosClient })
export const api = new ZodiosHooks('api', apiClient)
