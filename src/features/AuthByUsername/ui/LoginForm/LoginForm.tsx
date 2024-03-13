import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Input } from '@/shared/ui/deprecated/Input'
import { Text, TextStyle } from '@/shared/ui/deprecated/Text'

import { loginActions, loginReducer } from '../..//model/slice/loginSlice'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { loginByUsername } from '../../services/loginByUsername/loginByUsername'

import cls from './LoginForm.module.scss'

export interface LoginFormProps {
  className?: string
  onSuccess?: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useAppSelector(getLoginUsername)
  const password = useAppSelector(getLoginPassword)
  const isLoading = useAppSelector(getLoginIsLoading)
  const error = useAppSelector(getLoginError)

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch],
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch],
  )

  const login = useCallback(async () => {
    const result = await dispatch(
      loginByUsername({
        username,
        password,
      }),
    )
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess?.()
    }
  }, [dispatch, onSuccess, password, username])

  const onLoginClick = useCallback(() => {
    void login()
  }, [login])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <h1>{t('Авторизация')}</h1>
        {!!error && (
          <div>
            <Text style={TextStyle.DANGER}>
              {t(
                'Пользователь не найден или Вы ввели неверный логиг или пароль',
              )}
            </Text>
          </div>
        )}
        <Input
          type="text"
          placeholder={t('Логин')}
          value={username}
          onChange={onChangeUsername}
          autoFocus
        />
        <Input
          type="text"
          placeholder={t('Пароль')}
          value={password}
          onChange={onChangePassword}
          autoFocus
        />
        <div>
          <Button
            theme={ButtonTheme.OUTLINE}
            disabled={isLoading}
            onClick={onLoginClick}
          >
            {t('Войти')}
          </Button>
        </div>
      </div>
    </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
