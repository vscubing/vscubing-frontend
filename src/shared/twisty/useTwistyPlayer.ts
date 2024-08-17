import { TwistyPlayer } from '@vscubing/cubing/twisty'
import { useState, useEffect } from 'react'

export function useTwistyPlayer({ scramble, solution }: { scramble?: string; solution?: string }) {
  const [player, setPlayer] = useState<TwistyPlayer | null>(null)

  useEffect(() => {
    if (!scramble || !solution) {
      return
    }

    const newPlayer = new TwistyPlayer({
      controlPanel: 'none',
      background: 'none',
      visualization: 'PG3D',
      experimentalSetupAlg: scramble,
      alg: solution,
    })
    setPlayer(newPlayer)
    return () => setPlayer(null)
  }, [scramble, solution])

  return player
}
