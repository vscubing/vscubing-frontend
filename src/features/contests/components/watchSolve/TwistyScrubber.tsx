import { tailwindConfig } from '@/utils'
import { TwistyScrubber as Scrubber, type TwistyPlayer as Player } from '@vscubing/cubing/twisty'
import { useEffect, useRef } from 'react'

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

      elem.style.setProperty('--min', elem.min == '' ? '0' : elem.min)
      elem.style.setProperty('--max', elem.max == '' ? '100' : elem.max)
      elem.style.setProperty('--value', timestamp.toString())
      elem.classList.add('styled-slider', 'slider-progress')
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

const colors = tailwindConfig.theme.colors
const scrubberStyles = `
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

/*generated with Input range slider CSS style generator (version 20211225)
https://toughengineer.github.io/demo/slider-styler*/
input[type=range].styled-slider {
  height: 1rem;
  -webkit-appearance: none;
}

/*progress support*/
input[type=range].styled-slider.slider-progress {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 1rem + var(--ratio) * (100% - 1rem));
}

/*webkit*/
input[type=range].styled-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 1em;
  background: ${colors.white};
  border: none;
  box-shadow: none;
  margin-top: calc(0.25rem * 0.5 - 1rem * 0.5);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

input[type=range].styled-slider::-webkit-slider-runnable-track {
  height: 0.25rem;
  border: none;
  border-radius: 0.5em;
  background: ${colors.grey[60]};
  box-shadow: none;
}

input[type=range].styled-slider::-webkit-slider-thumb:hover {
  box-shadow: 0px 0px 0px 0.25rem ${colors.primary[80]};
}

input[type=range].styled-slider::-webkit-slider-thumb:active {
  box-shadow: 0px 0px 0px 0.125rem ${colors.primary[80]};
}

input[type=range].styled-slider.slider-progress::-webkit-slider-runnable-track {
  background: linear-gradient(${colors.white},${colors.white}) 0/var(--sx) 100% no-repeat, ${colors.grey[60]};
}

/*mozilla*/
input[type=range].styled-slider::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 1em;
  background: ${colors.white};
  border: none;
  box-shadow: none;
}

input[type=range].styled-slider::-moz-range-track {
  height: 0.25rem;
  border: none;
  border-radius: 0.5em;
  background: ${colors.grey[60]};
  box-shadow: none;
}

input[type=range].styled-slider::-moz-range-thumb:hover {
  box-shadow: 0px 0px 0px 0.25rem ${colors.primary[80]};
}

input[type=range].styled-slider::-moz-range-thumb:active {
  box-shadow: 0px 0px 0px 0.125rem ${colors.primary[80]};
}

input[type=range].styled-slider.slider-progress::-moz-range-track {
  background: linear-gradient(${colors.white},${colors.white}) 0/var(--sx) 100% no-repeat, ${colors.grey[60]};
}

/*ms*/
input[type=range].styled-slider::-ms-fill-upper {
  background: transparent;
  border-color: transparent;
}

input[type=range].styled-slider::-ms-fill-lower {
  background: transparent;
  border-color: transparent;
}

input[type=range].styled-slider::-ms-thumb {
  width: 1rem;
  height: 1rem;
  border-radius: 1em;
  background: ${colors.white};
  border: none;
  box-shadow: none;
  margin-top: 0;
  box-sizing: border-box;
}

input[type=range].styled-slider::-ms-track {
  height: 0.25rem;
  border-radius: 0.5em;
  background: ${colors.grey[60]};
  border: none;
  box-shadow: none;
  box-sizing: border-box;
}

input[type=range].styled-slider::-ms-thumb:hover {
  box-shadow: 0px 0px 0px 0.25rem ${colors.primary[80]};
}

input[type=range].styled-slider::-ms-thumb:active {
  box-shadow: 0px 0px 0px 0.125rem ${colors.primary[80]};
}

input[type=range].styled-slider.slider-progress::-ms-fill-lower {
  height: 0.25rem;
  border-radius: 0.5em 0 0 0.5em;
  margin: -undefined 0 -undefined -undefined;
  background: ${colors.white};
  border: none;
  border-right-width: 0;
}
`
