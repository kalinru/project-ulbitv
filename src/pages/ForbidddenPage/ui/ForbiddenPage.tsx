import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'
// import cls from './ForbiddenPage.module.scss'

interface ForbiddenPageProps {
  className?: string
}

export const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation()

  return (
    <Page className={classNames('', {}, [className])}>
      <Text>{t('У Вас нет доступа к данной странице')}</Text>
    </Page>
  )
}
