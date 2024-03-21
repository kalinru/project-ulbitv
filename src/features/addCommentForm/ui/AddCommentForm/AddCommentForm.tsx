import { memo, type FC, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  type ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ToggleFeatures } from '@/shared/lib/features'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Button } from '@/shared/ui/redesigned/Button'
import { Card } from '@/shared/ui/redesigned/Card'
import { Input } from '@/shared/ui/redesigned/Input'
import { HStack } from '@/shared/ui/redesigned/Stack'

import { getAddCommentFromText } from '../../model/selectors/addCommentFormSelectors'
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice'

import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm: FC<AddCommentFormProps> = memo(
  ({ className, onSendComment }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    // const error = useAppSelector(getAddCommentFromError)
    const text = useAppSelector(getAddCommentFromText)

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value))
      },
      [dispatch],
    )

    const onSendCommentHandler = useCallback(() => {
      onCommentTextChange('')
      onSendComment?.(text ?? '')
    }, [onCommentTextChange, onSendComment, text])

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Card fullWidth border="partial">
              <HStack
                gap="16"
                max
                justify="between"
                className={classNames(cls.AddCommentFormRedesigned, {}, [
                  className,
                ])}
                data-testid="AddCommentForm"
              >
                <Input
                  placeholder={t('Введите комментарий')}
                  className={cls.input}
                  value={text}
                  onChange={onCommentTextChange}
                  data-testid="AddCommentForm.Input"
                />
                <Button
                  variant="outline"
                  onClick={onSendCommentHandler}
                  data-testid="AddCommentForm.Button"
                >
                  {t('Отправить')}
                </Button>
              </HStack>
            </Card>
          }
          off={
            <HStack
              gap="16"
              max
              justify="between"
              className={classNames(cls.AddCommentForm, {}, [className])}
              data-testid="AddCommentForm"
            >
              <InputDeprecated
                placeholder={t('Введите комментарий')}
                className={cls.input}
                value={text}
                onChange={onCommentTextChange}
                data-testid="AddCommentForm.Input"
              />
              <ButtonDeprecated
                theme={ButtonTheme.OUTLINE}
                onClick={onSendCommentHandler}
                data-testid="AddCommentForm.Button"
              >
                {t('Отправить')}
              </ButtonDeprecated>
            </HStack>
          }
        />
      </DynamicModuleLoader>
    )
  },
)

AddCommentForm.displayName = 'AddCommentForm'

export default AddCommentForm
