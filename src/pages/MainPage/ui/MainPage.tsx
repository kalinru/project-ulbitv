import { BugButton } from 'app/providers/ErrorBoundry'
import { Counter } from 'entities/Counter'
import { useTranslation } from 'react-i18next'
import { ListBox } from 'shared/ui/ListBox/ListBox'
import { Page } from 'widgets/Page/Page'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>{t('Главная')}</div>
      <div><Counter/></div>
      <ListBox onChange={console.log} defaultValue={t('choose value')} value={undefined} items={[
        { value: 'milk', content: 'milk' },
        { value: 'bread', content: 'bread' },
        { value: 'banana', content: 'banana' },
        { value: 'orange', content: 'orange', disabled: true },
        { value: 'meat', content: 'meat' }
      ]}/>
      <div><BugButton /></div>
    </Page>
  )
}

export default MainPage
