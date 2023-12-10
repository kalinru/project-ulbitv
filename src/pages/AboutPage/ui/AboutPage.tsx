import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation()

  return (<>
    <div>{t('О сайте')}</div>
    <div><Counter/></div>
  </>)
}

export default AboutPage
