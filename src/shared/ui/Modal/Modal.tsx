import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import React, { useState, type ReactNode, useRef, useEffect, useCallback } from 'react'
import { Portal } from 'shared/ui/Portal/Portal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  lazy?: boolean
  onClose?: () => void
}

const ANIMATION_TIME = 200

export const Modal = (props: ModalProps) => {
  const {
    children,
    className,
    isOpen = false,
    lazy,
    onClose
  } = props

  const [isClosing, setIsClosing] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  const closeHandler = useCallback(() => {
    setIsClosing(true)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (onClose) {
      timerRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_TIME)
    }
  }, [onClose])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeHandler()
    }
  }, [closeHandler])

  const onContentClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

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

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay}
           onClick={closeHandler}>
          <div className={cls.content}
             onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
