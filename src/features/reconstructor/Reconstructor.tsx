import classNames from 'classnames'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

type Reconstruction = { scramble: string; reconstruction: string }
type ReconstructorProps = { content?: { reconstruction: Reconstruction; link: string }; onClose: () => void }
export const Reconstructor = ({ content, onClose }: ReconstructorProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const onBackgroundClick: MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    if (content && iframeRef.current) {
      setIsLoaded(true)
      importSolveOnLoad(iframeRef.current, content.reconstruction, content.link)
    }
  }, [content])

  return (
    <div
      onClick={onBackgroundClick}
      className={classNames({ invisible: !content }, 'fixed	inset-0 flex justify-center bg-black bg-opacity-40 pt-20')}
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

  return (iframeElement: HTMLIFrameElement, reconstruction: Reconstruction, link: string) => {
    const importSolve = () =>
      iframeElement.contentWindow?.postMessage({ source: 'vs-integration', payload: { reconstruction, link } })

    if (loaded) {
      importSolve()
    }
    iframeElement.onload = () => {
      loaded = true
      importSolve()
    }
  }
})()
