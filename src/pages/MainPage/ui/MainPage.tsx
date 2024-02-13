import { BugButton } from 'app/providers/ErrorBoundry'
import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/Page'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>{t('Главная')}</div>
      <div><Counter/></div>
      <div><BugButton /></div>
    </Page>
  )
}

export default MainPage
