import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = ({ className, short = true }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toogle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button
          theme={ButtonTheme.BACKGROUND_INVERTED}
          className={classNames('', {}, [className])}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={toogle}>
      {t(short ? 'Текущий Язык Коротко' : 'Текущий Язык')}
    </Button>
  )
}
