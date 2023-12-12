import { BugButton } from 'app/providers/ErrorBoundry'
import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
  const { t } = useTranslation()

  return (<>
    <div>{t('Главная')}</div>
    <div><Counter/></div>
    <div><BugButton /></div>
  </>)
}

export default MainPage
