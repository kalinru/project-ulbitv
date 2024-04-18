import { useState, useRef, useCallback, useEffect } from 'react'

interface UseModalProps {
  onClose?: () => void
  isOpen?: boolean
  animationDelay?: number
}

const ANIMATION_TIME = 200

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */
export const useModal = ({
  animationDelay = ANIMATION_TIME,
  isOpen,
  onClose,
}: UseModalProps) => {
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [isOpening, setIsOpening] = useState<boolean>(true)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const close = useCallback(() => {
    setIsClosing(true)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (onClose) {
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, animationDelay)
    }
  }, [animationDelay, onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    },
    [close],
  )

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (isOpen) {
      timeout = setTimeout(() => {
        setIsOpening(false)
      }, 10)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return {
    isClosing,
    isOpening,
    isMounted,
    close,
  }
}
