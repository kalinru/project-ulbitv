import { BugButton } from 'app/providers/ErrorBoundry'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation('main')

  return (<>
    <div>{t('Главная')}</div>
    <div><BugButton /></div>
  </>)
}

export default MainPage
