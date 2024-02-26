import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import { Button, ButtonTheme } from '@/shared/ui'
import { Card } from '@/shared/ui/Card'
import { Drawer } from '@/shared/ui/Drawer'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Text, TextSize } from '@/shared/ui/Text'

interface RatingCardProps {
  className?: string
  rate?: number
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (startCount: number) => void
  onAccept?: (startCount: number, feedback?: string) => void
}

// TODO rename entity folder to "Rating"
export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className, feedbackTitle, hasFeedback, title, onCancel, onAccept,
    rate = 0
  } = props
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStartCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback((selectedStartsCount: number) => {
    setStartCount(selectedStartsCount)
    if (hasFeedback) {
      setIsModalOpen(true)
    } else {
      onAccept?.(selectedStartsCount)
    }
  }, [hasFeedback, onAccept])

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <VStack max gap='32'>
      <Text size={TextSize.XL}>{feedbackTitle}</Text>
      <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>
      <HStack justify='end' gap='8' max>
        <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE}>
          {t('Закрыть')}
        </Button>
        <Button onClick={acceptHandler} theme={ButtonTheme.BACKGROUND_INVERTED}>
          {t('Отправить')}
        </Button>
      </HStack>
    </VStack>
  )

  return (
    <Card className={classNames('', {}, [className])} max>
      <VStack align='center' gap='8' max>
        <Text size={TextSize.XL}>{starsCount ? t('Спасибо за оценку!') : title}</Text>
        <StarRating size={40} onSelect={onSelectStars} selectedStars={starsCount}/>
      </VStack>
      {isMobile
        ? (
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            {modalContent}
          </Drawer>
          )
        : (
          <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
            {modalContent}
          </Modal>
          )}
    </Card>
  )
})

RatingCard.displayName = 'RatingCard'
