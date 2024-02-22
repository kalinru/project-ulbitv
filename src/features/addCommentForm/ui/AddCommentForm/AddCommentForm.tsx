import { memo, type FC, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AddCommentForm.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonTheme } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/providers/StoreProvider/config/store'
import {
  getAddCommentFromText
} from '../../model/selectors/addCommentFormSelectors'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  addCommentFormActions,
  addCommentFormReducer
} from '../../model/slices/addCommentFormSlice'
import {
  DynamicModuleLoader,
  type ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/Stack'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm: FC<AddCommentFormProps> = memo(({ className, onSendComment }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  // const error = useAppSelector(getAddCommentFromError)
  const text = useAppSelector(getAddCommentFromText)

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value))
  }, [dispatch])

  const onSendCommentHandler = useCallback(() => {
    onCommentTextChange('')
    onSendComment?.(text ?? '')
  }, [onCommentTextChange, onSendComment, text])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <HStack gap='16' max justify='between'
              className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input placeholder={t('Введите комментарий')}
               className={cls.input}
               value={text}
               onChange={onCommentTextChange}/>
        <Button theme={ButtonTheme.OUTLINE}
                onClick={onSendCommentHandler}>
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  )
})

AddCommentForm.displayName = 'AddCommentForm'

export default AddCommentForm
