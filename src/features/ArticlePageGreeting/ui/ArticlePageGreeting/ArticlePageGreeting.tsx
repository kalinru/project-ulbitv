import { memo, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { saveUserSettings, useUserSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import { Text } from '@/shared/ui/deprecated/Text'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Modal } from '@/shared/ui/redesigned/Modal'

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageWasOpened } = useUserSettings()
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true)
      void dispatch(saveUserSettings({ isArticlesPageWasOpened: true }))
    }
  }, [dispatch, isArticlesPageWasOpened])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const text = (
    <Text>
      {t(
        'Добро пожаловать на страницу статей! Оценивайте статьи и оставляйте комментарии!',
      )}
    </Text>
  )

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    )
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  )
})

ArticlePageGreeting.displayName = 'ArticlePageGreeting'
