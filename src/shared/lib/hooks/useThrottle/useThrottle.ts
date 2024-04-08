import { useCallback, useEffect, useRef } from 'react'

export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const throttleRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args)
        throttleRef.current = true

        timeoutRef.current = setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callback, delay],
  )
}
