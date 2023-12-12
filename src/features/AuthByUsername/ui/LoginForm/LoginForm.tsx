import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { Button } from 'shared/ui'
import { Input } from 'shared/ui/CarriageInput/Input'
import { useState } from 'react'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const [v1, setV1] = useState('111')

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input type="text" placeholder={t('Логин')} value={v1} onChange={setV1} autofocus/>
      <Input type="text" placeholder={t('Пароль')}/>
      <Button>
        {t('Войти')}
      </Button>
    </div>
  )
}
