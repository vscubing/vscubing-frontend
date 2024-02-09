import { TwistyAlgViewer as AlgViewer, type TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { useRef, useEffect } from 'react'

interface TwistyAlgViewerProps {
  twistyPlayer: Player
  className?: string
}
export const TwistyAlgViewer = ({ className, twistyPlayer }: TwistyAlgViewerProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const algViewer = new AlgViewer({ twistyPlayer }) // TODO: add lazy loading
    if (className) {
      algViewer.className = className
    }
    spanRef.current?.appendChild(algViewer)

    const style = document.createElement('style')
    algViewer.textContent = algViewerStyles
    const test = document.createElement('div')
    test.innerHTML = 'test'
    setTimeout(() => {
      algViewer.querySelectorAll('twisty-alg-leaf-elem').forEach((elem) => {
        console.log(elem.shadowRoot)
        elem.shadowRoot?.appendChild(test)
        elem.shadowRoot?.appendChild(style)
      })
    }, 0)
    algViewer.append(style)

    return () => algViewer.remove()
  }, [className, twistyPlayer])

  return <span className={className} ref={spanRef} />
}

const algViewerStyles = `
a {
  color: red;
}
`
