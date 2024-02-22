import { Counter } from '@/entities/Counter'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/Page'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>{t('О сайте')}</div>
      <div><Counter/></div>
    </Page>
  )
}

export default AboutPage
