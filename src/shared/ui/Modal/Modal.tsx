import { type Mods, classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import React, { useState, type ReactNode, useRef, useEffect, useCallback } from 'react'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

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
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
