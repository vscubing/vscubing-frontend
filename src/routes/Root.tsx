import { Navbar } from '@/components/Navbar'

export function Root() {
  return (
    <div className='h-screen w-screen bg-slate-800 text-center text-white'>
      <Navbar />
      <h1>Vite + React</h1>
      <div className='card'>it works!</div>
    </div>
  )
}
