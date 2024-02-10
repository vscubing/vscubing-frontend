import { TwistyScrubber as Scrubber, type TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { useEffect, useRef } from 'react'
import { handleSliderStylesOnChange, sliderStyles } from './common'

type TwistyScrubberProps = {
  twistyPlayer: Player
  className?: string
}
export const TwistyScrubber = ({ className, twistyPlayer }: TwistyScrubberProps) => {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const scrubber = new Scrubber(twistyPlayer.experimentalModel, twistyPlayer.controller, {
      mode: 'open',
    }) // TODO: add lazy loading

    const style = document.createElement('style')
    style.innerHTML = scrubberStyles
    scrubber.addElement(style)

    const handleProgress = ({ timestamp }: { timestamp: number }) => {
      const elem = scrubber.shadowRoot?.querySelector<HTMLInputElement>('input[type="range"]')
      if (!elem) {
        throw Error('scrubber input in shadowRoot is null')
      }
      elem.addEventListener('dragstart', (e) => e.preventDefault())
      handleSliderStylesOnChange(elem, timestamp.toString())
    }
    twistyPlayer.experimentalModel.detailedTimelineInfo.addFreshListener(handleProgress)

    spanRef.current?.appendChild(scrubber)
    return () => {
      scrubber.remove()
      twistyPlayer.experimentalModel.detailedTimelineInfo.removeFreshListener(handleProgress)
    }
  }, [className, twistyPlayer])

  return <span className={className} ref={spanRef} />
}

const scrubberStyles =
  `
:host {
  width: 100% !important;
}

.wrapper {
  overflow: visible !important;
  background: none !important;
}

input:not(:disabled) {
  cursor: pointer !important;
}

input {
  width: 100%;
  background: none;
  display: block;
  cursor: pointer;
}
` + sliderStyles
