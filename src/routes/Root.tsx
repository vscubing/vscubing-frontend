import { axiosClient } from '@/api/axios'
import { Navbar } from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export function Root() {
  axiosClient.get('accounts/user_test/').then(console.log)
  axiosClient
    .post('accounts/google/login/', {
      code: '4/0AfJohXmHn9iUxrhJWln7aQFiTbwVDmGeWQFYlppXwEggaBAFA6RsHBkcMolt8-W0sEz0jg',
    })
    .then(console.log)

  return (
    <div className='h-screen w-screen bg-slate-800 text-center text-white'>
      <Navbar />
      <Outlet />
    </div>
  )
}
