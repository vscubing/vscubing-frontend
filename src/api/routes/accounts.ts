import { axiosClient } from '..'

const PREFIX = '/accounts'

export const getUserTest = () => axiosClient.get<string>(PREFIX + '/user_test/')
