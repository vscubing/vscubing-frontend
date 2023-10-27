import classNames from 'classnames'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

type Reconstruction = { scramble: string; reconstruction: string; link: string }
type ReconstructorProps = { reconstruction: Reconstruction | null; onClose: () => void }
export const Reconstructor = ({ reconstruction, onClose }: ReconstructorProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const onBackgroundClick: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (reconstruction && iframeRef.current) {
      setIsLoaded(true)
      importSolveOnLoad(iframeRef.current, reconstruction)
    }
  }, [reconstruction])

  return (
    <div
      onClick={onBackgroundClick}
      className={classNames(
        { invisible: !reconstruction },
        'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20',
      )}
    >
      <iframe
        ref={iframeRef}
        className='rounded-[5px]'
        src={isLoaded ? '/alg.cubing.net/index.html' : undefined}
        width='1300'
        height='550'
      ></iframe>
    </div>
  )
}

const importSolveOnLoad = (() => {
  let loaded = false

  return (iframeElement: HTMLIFrameElement, reconstruction: Reconstruction) => {
    const importSolve = () => iframeElement.contentWindow?.postMessage({ source: 'vs-integration', reconstruction })

    if (loaded) {
      importSolve()
    }
    iframeElement.onload = () => {
      loaded = true
      importSolve()
    }
  }
})()
