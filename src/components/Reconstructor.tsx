import classNames from 'classnames'
import { MouseEventHandler, useRef } from 'react'

export type ReconstructorSolve = { scramble: string; reconstruction: string }

type ReconstructorProps = { solve: ReconstructorSolve | null; onClose: () => void }
export const Reconstructor = ({ solve, onClose }: ReconstructorProps) => {
  const iframeRef = useRef(null)

  const onBackgroundClick: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      onClick={onBackgroundClick}
      className={classNames({ invisible: !solve }, 'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20')}
    >
      <iframe ref={iframeRef} className='rounded-[5px]' src='http://127.0.0.1:8080' width='1000' height='500'></iframe>
    </div>
  )
}
