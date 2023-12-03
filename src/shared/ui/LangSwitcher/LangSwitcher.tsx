import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const toogle = async (): Promise<void> => {
    await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
  }

  return (
    <Button
          theme={ThemeButton.CLEAR}
          className={classNames('', {}, [className])}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={toogle}>
      {t('Текущий Язык')}
    </Button>
  )
}
