import { type ReactNode } from 'react'

import { type Mods, classNames } from '@/shared/lib/classNames/classNames'
import { toggleFeatures } from '@/shared/lib/features'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'

import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  lazy?: boolean
  onClose?: () => void
}

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen = false, lazy, onClose } = props

  const { close, isClosing, isOpening, isMounted } = useModal({
    isOpen,
    onClose,
  })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
    [cls.isOpening]: isOpening,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld,
          }),
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
