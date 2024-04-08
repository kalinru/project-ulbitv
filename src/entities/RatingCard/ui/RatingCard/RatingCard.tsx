import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ToggleFeatures } from '@/shared/lib/features'
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { StarRating } from '@/shared/ui/deprecated/StarRating'
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text'
import { Button } from '@/shared/ui/redesigned/Button'
import { Card } from '@/shared/ui/redesigned/Card'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { Input } from '@/shared/ui/redesigned/Input'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

interface RatingCardProps {
  className?: string
  rate?: number
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (startCount: number) => void
  onAccept?: (startCount: number, feedback?: string) => void
}

// FIXME p3 rename entity folder to "Rating"
export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    feedbackTitle,
    hasFeedback,
    title,
    onCancel,
    onAccept,
    rate = 0,
  } = props
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [starsCount, setStartCount] = useState(rate)
  const [feedback, setFeedback] = useState('')

  const onSelectStars = useCallback(
    (selectedStartsCount: number) => {
      setStartCount(selectedStartsCount)
      if (hasFeedback) {
        setIsModalOpen(true)
      } else {
        onAccept?.(selectedStartsCount)
      }
    },
    [hasFeedback, onAccept],
  )

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false)
    onAccept?.(starsCount, feedback)
  }, [feedback, onAccept, starsCount])

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false)
    onCancel?.(starsCount)
  }, [onCancel, starsCount])

  const modalContent = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <VStack max gap="32">
          <Text size="xl">{feedbackTitle}</Text>
          <Input
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
            data-testid="RatingCard.Input"
          />
          <HStack justify="end" gap="8" max>
            <Button
              onClick={cancelHandler}
              variant="outline"
              data-testid="RatingCard.Close"
            >
              {t('Закрыть')}
            </Button>
            <Button
              onClick={acceptHandler}
              variant="outline"
              data-testid="RatingCard.Send"
            >
              {t('Отправить')}
            </Button>
          </HStack>
        </VStack>
      }
      off={
        <VStack max gap="32">
          <TextDeprecated size={TextSize.XL}>{feedbackTitle}</TextDeprecated>
          <InputDeprecated
            value={feedback}
            onChange={setFeedback}
            placeholder={t('Ваш отзыв')}
            data-testid="RatingCard.Input"
          />
          <HStack justify="end" gap="8" max>
            <ButtonDeprecated
              onClick={cancelHandler}
              theme={ButtonTheme.OUTLINE}
              data-testid="RatingCard.Close"
            >
              {t('Закрыть')}
            </ButtonDeprecated>
            <ButtonDeprecated
              onClick={acceptHandler}
              theme={ButtonTheme.BACKGROUND_INVERTED}
              data-testid="RatingCard.Send"
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        </VStack>
      }
    />
  )

  const content = (
    <>
      <VStack align="center" gap="8" max>
        <ToggleFeatures
          feature="isAppRedesigned"
          on={
            <Text size="xl">
              {starsCount ? t('Спасибо за оценку!') : title}
            </Text>
          }
          off={
            <TextDeprecated size={TextSize.XL}>
              {starsCount ? t('Спасибо за оценку!') : title}
            </TextDeprecated>
          }
        />
        <StarRating
          size={40}
          onSelect={onSelectStars}
          selectedStars={starsCount}
        />
      </VStack>
      {isMobile ? (
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
          {modalContent}
        </Drawer>
      ) : (
        <Modal isOpen={isModalOpen} lazy onClose={cancelHandler}>
          {modalContent}
        </Modal>
      )}
    </>
  )

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card fullWidth border="partial" padding="24" data-testid="RatingCard">
          {content}
        </Card>
      }
      off={
        <CardDeprecated className={className} max data-testid="RatingCard">
          {content}
        </CardDeprecated>
      }
    />
  )
})

RatingCard.displayName = 'RatingCard'
