import { type ReactNode, createContext, useRef, useState, useEffect, useMemo, useContext } from 'react'

/* eslint-disable @typescript-eslint/consistent-type-imports */
type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextPayload {
  Gesture?: GestureType
  Spring?: SpringType
  isLoaded?: boolean

}

const AnimationContext = createContext<AnimationContextPayload>({})

const getAsyncAnimationModules = async () => {
  return await Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react')
  ])
}

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>
}

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const SpringRef = useRef<SpringType>()
  const GestureRef = useRef<GestureType>()

  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    void getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring
      GestureRef.current = Gesture
      setIsloaded(true)
    })
  })

  const value: AnimationContextPayload = useMemo(() => ({
    isLoaded,
    Gesture: GestureRef.current,
    Spring: SpringRef.current
  }), [isLoaded])

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
