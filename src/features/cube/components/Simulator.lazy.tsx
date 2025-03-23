import { isDiscipline } from '@/types'
import { type SimulatorPuzzle, initSimulator } from '@/vendor/cstimer'
import { useRef, useState, useEffect, useCallback, type ReactNode, type RefObject } from 'react'

export type InitSolveData = { scramble: string; discipline: string }

export type SolveResult = { isDnf: false; reconstruction: string; timeMs: number } | { isDnf: true }
export type SolveFinishCallback = (result: SolveResult) => void

type SimulatorSettings = {
  animationDuration: number
  inspectionVoiceAlert: 'Male' | 'Female' | 'None'
}
type SimulatorProps = {
  initSolveData: InitSolveData
  onInspectionStart: () => void
  onSolveFinish: SolveFinishCallback
  settings: SimulatorSettings
}
export default function Simulator({ initSolveData, onSolveFinish, onInspectionStart, settings }: SimulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'idle' | 'ready' | 'inspecting' | 'solving' | 'solved'>('idle')
  const [inspectionStartTimestamp, setInspectionStartTimestamp] = useState<number>()
  const [solveStartTimestamp, setSolveStartTimestamp] = useState<number>()
  const [currentTimestamp, setCurrentTimestamp] = useState<number>()
  const [solution, setSolution] = useState<{ move: Move; timestamp: number }[]>()

  const [heard8sAlert, setHeard8sAlert] = useState(false)
  const [heard12sAlert, setHeard12sAlert] = useState(false)

  useEffect(() => {
    setStatus(initSolveData ? 'ready' : 'idle')
  }, [initSolveData])

  useEffect(() => {
    if (status !== 'idle' && status !== 'ready') return

    setSolveStartTimestamp(undefined)
    setInspectionStartTimestamp(undefined)
    setCurrentTimestamp(undefined)
    setSolution([])
    setHeard8sAlert(false)
    setHeard12sAlert(false)
  }, [status])

  useEffect(() => {
    if (status !== 'ready') return
    containerRef.current?.focus()

    const abortSignal = new AbortController()
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.keyCode === SPACEBAR_KEY_CODE) setStatus('inspecting')
      },
      abortSignal,
    )
    return () => abortSignal.abort()
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting') return

    requestAnimationFrame(() => setInspectionStartTimestamp(performance.now())) // we need requestAnimationFrame here to prevent these timestamps from getting ahead of current timestamp
    onInspectionStart()
  }, [status, onInspectionStart])

  useEffect(() => {
    if (status !== 'solving') return
    requestAnimationFrame(() => setSolveStartTimestamp(performance.now())) // we need requestAnimationFrame here to prevent these timestamps from getting ahead of current timestamp
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting' && status !== 'solving') return
    const abortSignal = new AbortController()

    requestAnimationFrame(function runningThread() {
      if (abortSignal.signal.aborted) return

      setCurrentTimestamp(performance.now())
      requestAnimationFrame(runningThread)
    })

    return () => abortSignal.abort()
  }, [status])

  useEffect(() => {
    if (status !== 'inspecting') return
    if (!inspectionStartTimestamp || !currentTimestamp) return

    const inspectionMs = currentTimestamp - inspectionStartTimestamp

    if (inspectionMs >= 7_900 && !heard8sAlert) {
      void VOICE_ALERTS[settings.inspectionVoiceAlert]['8s'].play()
      setHeard8sAlert(true)
    }
    if (inspectionMs >= 11_900 && !heard12sAlert) {
      void VOICE_ALERTS[settings.inspectionVoiceAlert]['12s'].play()
      setHeard12sAlert(true)
    }

    if (inspectionMs > INSPECTION_DNF_THRESHHOLD_MS) {
      onSolveFinish({ isDnf: true })
      setStatus('idle')
    }
  }, [
    status,
    inspectionStartTimestamp,
    currentTimestamp,
    onSolveFinish,
    settings.inspectionVoiceAlert,
    heard8sAlert,
    heard12sAlert,
  ])

  const moveHandler = useCallback<SimulatorMoveListener>(({ move, isRotation, isSolved }) => {
    setSolution((prev) => {
      if (!prev) throw new Error('[SIMULATOR] moves undefined')
      return [...prev, { move, timestamp: performance.now() }]
    })
    setStatus((prevStatus) => {
      if (prevStatus === 'inspecting' && !isRotation) {
        return 'solving'
      }
      if (prevStatus === 'solving' && isSolved) return 'solved'

      return prevStatus
    })
  }, [])

  useEffect(() => {
    if (status !== 'solved') return
    if (!solution || !currentTimestamp || !solveStartTimestamp || !inspectionStartTimestamp)
      throw new Error(
        `[SIMULATOR] invalid solved state. solution: ${solution?.toString()}, currentTimestamp: ${currentTimestamp}, solveStartTimestamp: ${solveStartTimestamp}, inspectionStartTimestamp: ${inspectionStartTimestamp}`,
      )

    const inspectionMs = solveStartTimestamp - inspectionStartTimestamp
    const rawSolveTimeMs = solution.at(-1)!.timestamp - solveStartTimestamp
    const penalty = inspectionMs > INSPECTION_PLUS_TWO_THRESHHOLD_MS ? 2_000 : 0

    const reconstruction = solution
      .map(({ move, timestamp }) => `${move} /*${Math.max(timestamp - solveStartTimestamp, 0)}*/`)
      .join(' ')
    onSolveFinish({ timeMs: rawSolveTimeMs + penalty, isDnf: false, reconstruction })
    setStatus('idle')
  }, [status, solution, inspectionStartTimestamp, solveStartTimestamp, currentTimestamp, onSolveFinish])

  const displayedScramble = ['idle', 'ready'].includes(status) ? undefined : initSolveData.scramble
  useSimulator({
    containerRef,
    onMove: moveHandler,
    scramble: displayedScramble,
    discipline: initSolveData.discipline,
    animationDuration: settings.animationDuration,
  })

  return (
    <>
      <link href='https://fonts.googleapis.com/css2?family=M+PLUS+1+Code&display=swap' rel='stylesheet' />

      <div className='relative flex h-full items-center justify-center'>
        <span className='absolute right-4 top-1/2 -translate-y-1/2 text-7xl [font-family:"M_PLUS_1_Code",monospace] md:bottom-4 md:left-1/2 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-y-0'>
          {getDisplay(solveStartTimestamp, inspectionStartTimestamp, currentTimestamp)}
        </span>
        {status === 'ready' && (
          <span className='absolute bottom-20 rounded-[.75rem] bg-black-100 px-10 py-6 font-kanit text-[1.25rem] text-secondary-20'>
            Press space to scramble the cube and start the preinspection
          </span>
        )}
        <div className='h-[60%] [&>div]:flex' tabIndex={-1} ref={containerRef}></div>
      </div>
    </>
  )
}
const SPACEBAR_KEY_CODE = 32

function getDisplay(
  solveStartTimestamp?: number,
  inspectionStartTimestamp?: number,
  currentTimestamp?: number,
): ReactNode {
  if (!currentTimestamp || !inspectionStartTimestamp) return ''
  if (solveStartTimestamp) {
    return formatElapsedTime(currentTimestamp - solveStartTimestamp)
  }

  const elapsedInspectionMs = currentTimestamp - inspectionStartTimestamp
  if (elapsedInspectionMs > INSPECTION_PLUS_TWO_THRESHHOLD_MS) return '+2'
  return INSPECTION_PLUS_TWO_THRESHHOLD_MS / 1_000 - Math.floor(elapsedInspectionMs / 1_000)
}

function formatElapsedTime(fullMs: number) {
  const fullSeconds = getSeconds(fullMs)
  const minutes = getMinutes(fullMs)
  const seconds = fullSeconds - minutes * MINUTE_IN_SECONDS
  const ms = fullMs - fullSeconds * SECOND_IN_MS
  const tenths = Math.floor(ms / 100)

  if (minutes) {
    return (
      <>
        {minutes}:{seconds.toString().padStart(2, '0')}.<span className='text-[.75em]'>{tenths}</span>
      </>
    )
  }
  return (
    <>
      {seconds}.<span className='text-[.75em]'>{tenths}</span>
    </>
  )
}

const getSeconds = (ms: number): number => Math.floor(ms / SECOND_IN_MS)
const getMinutes = (ms: number): number => Math.floor(ms / MINUTE_IN_MS)
export const SECOND_IN_MS = 1_000
export const MINUTE_IN_SECONDS = 60
export const MINUTE_IN_MS = MINUTE_IN_SECONDS * SECOND_IN_MS

const INSPECTION_PLUS_TWO_THRESHHOLD_MS = 15_000
const INSPECTION_DNF_THRESHHOLD_MS = 17_000

type SimulatorMoveListener = ({
  move,
  isRotation,
  isSolved,
}: {
  move: Move
  timestamp: number
  isRotation: boolean
  isSolved: boolean
}) => void
function useSimulator({
  containerRef,
  onMove,
  scramble,
  discipline,
  animationDuration,
}: {
  containerRef: RefObject<HTMLElement>
  onMove: SimulatorMoveListener
  scramble: string | undefined
  discipline: string
  animationDuration: number
}) {
  useEffect(() => {
    const abortSignal = new AbortController()

    if (!isDiscipline(discipline)) throw new Error(`[SIMULATOR] unsupported discipline: ${discipline}`)

    let puzzle: SimulatorPuzzle
    let wasScrambleApplied = false
    let isSolved = false
    void initSimulator(
      {
        puzzle: SIMULATOR_DISCIPLINES_MAP[discipline].puzzle,
        animationDuration,
      },
      (rawMove, mstep, timestamp) => {
        if (!puzzle) throw new Error('[SIMULATOR] puzzle undefined')

        if (mstep !== 2 || !wasScrambleApplied) return
        const move = parseCstimerMove(puzzle.move2str(rawMove))
        if (puzzle.isSolved() === 0) isSolved = true
        onMove({ move, timestamp, isRotation: puzzle.isRotation(rawMove), isSolved })
      },
      containerRef.current!,
    ).then((pzl) => {
      puzzle = pzl

      setTimeout(() => puzzle.resize())
      if (scramble) {
        puzzle.applyMoves(puzzle.parseScramble(scramble))
        wasScrambleApplied = true
      }
      window.addEventListener(
        'keydown',
        (e) => {
          if (!scramble || isSolved) return
          puzzle.keydown(e)
        },
        abortSignal,
      )
    })

    return () => abortSignal.abort()
  }, [onMove, containerRef, scramble, discipline, animationDuration])
}

const SIMULATOR_DISCIPLINES_MAP = {
  '3by3': {
    dimension: 3,
    puzzle: 'cube3',
  },
  '2by2': {
    dimension: 2,
    puzzle: 'cube2',
  },
} as const

function parseCstimerMove(moveCstimer: string): Move {
  const move = moveCstimer
    .replace(/@(\d+)/g, '/*$1*/')
    .replace(/2-2Lw|2-2Rw'/g, 'M')
    .replace(/2-2Rw/g, "M'")
    .replace(/2-2Fw/g, 'S')
    .replace(/2-2Uw'/g, 'E')
    .replace(/2-2Uw/g, "E'")
    .trim()

  if (!isMove(move)) throw new Error(`[SIMULATOR] invalid move: ${move}`)
  return move
}

function isMove(moveStr: string): moveStr is Move {
  return (MOVES as readonly string[]).includes(moveStr)
}

const SIMPLE_MOVES = [
  'R',
  'U',
  'F',
  'B',
  'L',
  'D',
  'M',
  'E',
  'S',
  'Rw',
  'Uw',
  'Fw',
  'Bw',
  'Lw',
  'Dw',
  'x',
  'y',
  'z',
] as const
const MOVES = SIMPLE_MOVES.flatMap((move) => [move, `${move}'`, `${move}2`] as const)
type Move = (typeof MOVES)[number]

const ALERT_MALE_8s = new Audio(
  'data:audio/mp3;base64,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',
)
const ALERT_MALE_12s = new Audio(
  'data:audio/mp3;base64,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',
)
const ALERT_FEMALE_8s = new Audio(
  'data:audio/mp3;base64,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',
)
const ALERT_FEMALE_12s = new Audio(
  'data:audio/mp3;base64,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',
)

const VOICE_ALERTS = {
  Male: {
    '8s': ALERT_MALE_8s,
    '12s': ALERT_MALE_12s,
  },
  Female: {
    '8s': ALERT_FEMALE_8s,
    '12s': ALERT_FEMALE_12s,
  },
  None: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    '8s': { play: () => {} },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    '12s': { play: () => {} },
  },
} as const
