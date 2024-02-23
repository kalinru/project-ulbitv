import { useTranslation } from 'react-i18next'

import { Counter } from '@/entities/Counter'
import { Page } from '@/widgets/Page'

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
