import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './LoginModal.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Suspense, useEffect } from 'react'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import { Loader } from '@/shared/ui'

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
