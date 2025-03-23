import { lazy, useEffect, useState } from 'react'

const Simulator = lazy(() => import('@/features/cube/components/Simulator.lazy'))

export function SimulatorPage() {
  const [scramble, setScramble] = useState('R U')

  useEffect(generateNewScramble, [setScramble])

  useEffect(() => {
    const abortSignal = new AbortController()
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode === 13) generateNewScramble()
      },
      abortSignal,
    )
    return () => abortSignal.abort()
  }, [])

  function generateNewScramble() {
    const newScr = Array.from({ length: 3 })
      .map(() => {
        const MOVES_POOL = ['R', 'U', 'F', 'B', 'L', 'D'].flatMap((move) => [move, `${move}'`])
        const moveIdx = Math.floor(Math.random() * MOVES_POOL.length)
        return MOVES_POOL[moveIdx]
      })
      .join(' ')
    setScramble(newScr)
  }

  return (
    <div className='flex-1'>
      <Simulator
        initSolveData={{ discipline: '3by3', scramble }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onSolveStart={() => {}}
        onSolveFinish={(solve) => {
          generateNewScramble()
          console.log(solve)
        }}
      />
    </div>
  )
}
