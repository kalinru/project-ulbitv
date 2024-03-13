import { memo, type FC, useCallback } from 'react'

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
import { HStack } from '@/shared/ui/deprecated/Stack'

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
        <HStack
          gap="16"
          max
          justify="between"
          className={classNames(cls.AddCommentForm, {}, [className])}
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
            theme={ButtonTheme.OUTLINE}
            onClick={onSendCommentHandler}
            data-testid="AddCommentForm.Button"
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    )
  },
)

AddCommentForm.displayName = 'AddCommentForm'

export default AddCommentForm
