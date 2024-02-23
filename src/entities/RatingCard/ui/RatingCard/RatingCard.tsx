import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './RatingCard.module.scss'
import { memo, useCallback, useState } from 'react'
import { Card } from '@/shared/ui/Card/Card'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { StarRating } from '@/shared/ui/StarRating/StarRating'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ButtonTheme } from '@/shared/ui'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

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
    <Card className={classNames(cls.RatingCard, {}, [className])} max>
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
