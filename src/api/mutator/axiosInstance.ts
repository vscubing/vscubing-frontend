import { axiosClient } from '@/lib/axios'
import { type AxiosError, type AxiosRequestConfig } from 'axios'

export async function axiosInstance<T>(config: AxiosRequestConfig): Promise<T> {
  return axiosClient<T>(config).then(({ data }) => data)
}

export type ErrorType<T> = AxiosError<T>
