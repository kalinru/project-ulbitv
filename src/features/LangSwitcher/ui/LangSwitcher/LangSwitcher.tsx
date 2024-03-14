import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleFeatures } from '@/shared/lib/features/ToggleFeatures/ToggleFeatures'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Button } from '@/shared/ui/redesigned/Button'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = ({
  className,
  short = true,
}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toggle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Button
          variant="clear"
          className={classNames('', {}, [className])}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={toggle}
        >
          {t(short ? 'Текущий Язык Коротко' : 'Текущий Язык')}
        </Button>
      }
      off={
        <ButtonDeprecated
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={classNames('', {}, [className])}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={toggle}
        >
          {t(short ? 'Текущий Язык Коротко' : 'Текущий Язык')}
        </ButtonDeprecated>
      }
    />
  )
}
