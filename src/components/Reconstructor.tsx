import classNames from 'classnames'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

export type ReconstructorSolve = { scramble: string; reconstruction: string }

type ReconstructorProps = { solve: ReconstructorSolve | null; onClose: () => void }
export const Reconstructor = ({ solve, onClose }: ReconstructorProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const onBackgroundClick: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (solve && iframeRef.current) {
      setIsLoaded(true)
      importSolve(iframeRef.current, solve)
    }
  }, [solve])

  return (
    <div
      onClick={onBackgroundClick}
      className={classNames({ invisible: !solve }, 'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20')}
    >
      <iframe
        ref={iframeRef}
        className='rounded-[5px]'
        src={isLoaded ? 'http://127.0.0.1:8080' : undefined}
        width='1300'
        height='550'
      ></iframe>
    </div>
  )
}

const importSolve = (iframeElement: HTMLIFrameElement, solve: ReconstructorSolve) => {
  iframeElement.onload = () => {
    iframeElement.contentWindow?.postMessage({ source: 'vs-integration', solve }, 'http://127.0.0.1:8080')
  }
}
