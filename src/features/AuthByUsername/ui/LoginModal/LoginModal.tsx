import { Suspense, useEffect } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Loader } from '@/shared/ui'
import { Modal } from '@/shared/ui/Modal'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

import cls from './LoginModal.module.scss'

interface LoginModalProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => {
  useEffect(() => {
    return () => {
      onClose?.()
    }
  }, [onClose])

  return (
    <Modal className={classNames(cls.LoginModal, {}, [className])}
           lazy
           isOpen={isOpen}
           onClose={onClose}>
      <Suspense fallback={<Loader />}>
        <LoginFormAsync onSuccess={onClose}/>
      </Suspense>
    </Modal>
  )
}
