import { useEffect, useRef, useState } from 'react'

export type Reconstruction = { scramble: string; solution: string }
export type ReconstructionMetadata = {
  link: string
  contestNumber: number
  username: string
  scramblePosition: string
  formattedTime: string
}
type ReconstructorProps = {
  content: {
    reconstruction: Reconstruction
    metadata: ReconstructionMetadata
  } | null
}
export function Reconstructor({ content }: ReconstructorProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (content && iframeRef.current) {
      setIsLoaded(true)
      importSolveOnLoad(iframeRef.current, content.reconstruction, content.metadata)
    }
  }, [content])

  return (
    <iframe
      ref={iframeRef}
      className='rounded-[5px]'
      src={isLoaded ? '/twisty/' : undefined}
      width='100%'
      height='100%'
    ></iframe>
  )
}

const importSolveOnLoad = (() => {
  let isLoaded = false

  return (iframeElement: HTMLIFrameElement, reconstruction: Reconstruction, metadata: ReconstructionMetadata) => {
    const importSolve = () =>
      iframeElement.contentWindow?.postMessage({ source: 'vs-integration', payload: { reconstruction, metadata } })

    if (isLoaded) {
      importSolve()
    }
    iframeElement.onload = () => {
      isLoaded = true
      importSolve()
    }
  }
})()
