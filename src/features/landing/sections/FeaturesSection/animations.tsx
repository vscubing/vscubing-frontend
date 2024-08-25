import { cn } from '@/utils'
import { createContext, ReactNode, useRef, useState, useEffect, useContext, ComponentPropsWithoutRef } from 'react'
import { type BlockType } from '.'

type AnimationContextType = {
  animationState: Record<BlockType, 'waiting' | 'can-run'>
  blocksRef: BlocksRef
  onAnimationEnd: () => void
}

const AnimationContext = createContext<AnimationContextType | null>(null)

type BlocksRef = Map<BlockType, Element | null>
export function AnimationsController({ children }: { children: ReactNode }) {
  const blocksRef = useRef<BlocksRef>(new Map())
  const [state, setState] = useState<AnimationContextType['animationState']>({
    results: 'waiting',
    scrambles: 'waiting',
    leaderboards: 'waiting',
    sharing: 'waiting',
  })
  const [queue, setQueue] = useState<BlockType[]>(['results', 'scrambles', 'leaderboards', 'sharing'])

  useEffect(() => {
    if (queue.length === 0) return
    const currentBlock = queue[0]
    const currentBlockNode = blocksRef.current.get(currentBlock)
    if (!currentBlockNode) return

    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) setState({ ...state, [currentBlock]: 'running' })
      },
      {
        rootMargin: '-72px 0px 0px',
        threshold: 0,
      },
    )

    observer.observe(currentBlockNode)
    return () => observer.unobserve(currentBlockNode)
  }, [queue])

  function onAnimationEnd() {
    setQueue((prev) => prev.slice(1))
  }

  return (
    <AnimationContext.Provider value={{ animationState: state, onAnimationEnd, blocksRef: blocksRef.current }}>
      {children}
    </AnimationContext.Provider>
  )
}

function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('animation context is missing')
  }
  return context
}

export function BlockIntersectionWrapper({ children, block }: { children: ReactNode; block: BlockType }) {
  const { blocksRef } = useContext(AnimationContext)!

  function handleBlockRef(node: Element | null) {
    if (node) {
      blocksRef.set(block, node)
    } else {
      blocksRef.delete(block)
    }
  }

  return <div ref={handleBlockRef}>{children}</div>
}

export function AnimationItem({
  shouldRegisterAnimationEnd = false,
  className,
  block,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { block: BlockType; shouldRegisterAnimationEnd?: boolean }) {
  const { ref } = useRegisterAnimationEnd(shouldRegisterAnimationEnd)
  const { animationState } = useAnimationContext()

  return (
    <div className={cn({ paused: animationState[block] === 'waiting' }, className)} ref={ref} {...props}>
      {children}
    </div>
  )
}

function useRegisterAnimationEnd(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const { onAnimationEnd } = useContext(AnimationContext)!

  useEffect(() => {
    const node = ref.current
    if (!node || !enabled) {
      return
    }
    const callback = () => onAnimationEnd()
    node.addEventListener('animationend', callback)
    return () => node.removeEventListener('animationend', callback)
  }, [ref, enabled])

  return { ref }
}
