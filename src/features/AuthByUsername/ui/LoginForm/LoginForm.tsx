import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { Button, ButtonTheme } from 'shared/ui'
import { Input } from 'shared/ui/CarriageInput/Input'
import { memo, useCallback } from 'react'
import { loginActions, loginReducer } from '../..//model/slice/loginSlice'
import { useAppSelector } from 'app/providers/StoreProvider/config/store'
import { loginByUsername } from '../../services/loginByUsername/loginByUsername'
import { Text, TextStyle } from 'shared/ui/Text/Text'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import {
  DynamicModuleLoader,
  type ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

export interface LoginFormProps {
  className?: string
  onSuccess?: () => void
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const username = useAppSelector(getLoginUsername)
  const password = useAppSelector(getLoginPassword)
  const isLoading = useAppSelector(getLoginIsLoading)
  const error = useAppSelector(getLoginError)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const login = useCallback(async () => {
    const result = await dispatch(loginByUsername({
      username,
      password
    }))
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
        <h1>
          {t('Авторизация')}
        </h1>
        {!!error &&
        <div>
          <Text style={TextStyle.DANGER}>
            {t('Пользователь не найден или Вы ввели неверный логиг или пароль')}
          </Text>
        </div>
      }
        <Input type="text"
             placeholder={t('Логин')}
             value={username}
             onChange={onChangeUsername}
             autofocus/>
        <Input type="text"
             placeholder={t('Пароль')}
             value={password}
             onChange={onChangePassword}
             autofocus/>
        <div>
          <Button theme={ButtonTheme.OUTLINE}
                disabled={isLoading}
                onClick={onLoginClick}>
            {t('Войти')}
          </Button>
        </div>
      </div>
    </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm