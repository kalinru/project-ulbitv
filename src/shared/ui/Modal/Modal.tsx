import { type Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Modal.module.scss'
import { type ReactNode } from 'react'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  lazy?: boolean
  onClose?: () => void
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    className,
    isOpen = false,
    lazy,
    onClose
  } = props

  const { close, isClosing, isMounted } = useModal({ isOpen, onClose })

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
