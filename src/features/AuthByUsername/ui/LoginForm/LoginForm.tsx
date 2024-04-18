import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useForceUpdate } from '@/shared/lib/render/forceUpdate'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Text as TextDeprecated, TextStyle } from '@/shared/ui/deprecated/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

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
  const forceUpdate = useForceUpdate()

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
      forceUpdate()
    }
  }, [dispatch, forceUpdate, onSuccess, password, username])

  const onLoginClick = useCallback(() => {
    void login()
  }, [login])

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <form>
            <VStack
              gap="16"
              max
              className={classNames(cls.LoginForm, {}, [className])}
            >
              <Text size="xl">{t('Авторизация')}</Text>
              {!!error && (
                <div>
                  <Text style="danger">
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
              />
              <HStack justify="end" max>
                <Button
                  variant="outline"
                  disabled={isLoading}
                  onClick={onLoginClick}
                >
                  {t('Войти')}
                </Button>
              </HStack>
            </VStack>
          </form>
        }
        off={
          <form className={classNames(cls.LoginForm, {}, [className])}>
            <h1>{t('Авторизация')}</h1>
            {!!error && (
              <div>
                <TextDeprecated style={TextStyle.DANGER}>
                  {t(
                    'Пользователь не найден или Вы ввели неверный логиг или пароль',
                  )}
                </TextDeprecated>
              </div>
            )}
            <InputDeprecated
              type="text"
              placeholder={t('Логин')}
              value={username}
              onChange={onChangeUsername}
              autoFocus
            />
            <InputDeprecated
              type="text"
              placeholder={t('Пароль')}
              value={password}
              onChange={onChangePassword}
              autoFocus
            />
            <div>
              <ButtonDeprecated
                theme={ButtonTheme.OUTLINE}
                disabled={isLoading}
                onClick={onLoginClick}
              >
                {t('Войти')}
              </ButtonDeprecated>
            </div>
          </form>
        }
      />
    </DynamicModuleLoader>
  )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm
