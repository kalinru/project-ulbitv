import { BugButton } from '@/app/providers/ErrorBoundry'
import { Counter } from '@/entities/Counter'
import { useTranslation } from 'react-i18next'
import { ListBox } from '@/shared/ui/Popups/components/ListBox/ListBox'
import { Page } from '@/widgets/Page'
import { RatingCard } from '@/entities/RatingCard'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <div>{t('Главная')}</div>
      <RatingCard feedbackTitle={t('Оставьте пожайлуста ваш отзыв о статье')}
                  hasFeedback
                  title={t('Оцените статью')}
                  />
      <div><Counter/></div>
      <ListBox onChange={console.log}
               direction='top left'
               defaultValue={t('choose value')}
               value={undefined}
               items={[
                 { value: 'milk', content: 'milk' },
                 { value: 'bread', content: 'bread' },
                 { value: 'banana', content: 'banana' },
                 { value: 'orange', content: 'orange', disabled: true },
                 { value: 'meat', content: 'meat' }
               ]}/>

      <ListBox onChange={console.log}
               direction='top right'
               defaultValue={t('choose value')}
               value={undefined}
               items={[
                 { value: 'milk', content: 'milk' },
                 { value: 'bread', content: 'bread' },
                 { value: 'banana', content: 'banana' },
                 { value: 'orange', content: 'orange', disabled: true },
                 { value: 'meat', content: 'meat' }
               ]}/>
      <ListBox onChange={console.log}
               direction='bottom left'
               defaultValue={t('choose value')}
               value={undefined}
               items={[
                 { value: 'milk', content: 'milk' },
                 { value: 'bread', content: 'bread' },
                 { value: 'banana', content: 'banana' },
                 { value: 'orange', content: 'orange', disabled: true },
                 { value: 'meat', content: 'meat' }
               ]}/>
      <ListBox onChange={console.log}
               direction='bottom right'
               defaultValue={t('choose value')}
               value={undefined}
               items={[
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
