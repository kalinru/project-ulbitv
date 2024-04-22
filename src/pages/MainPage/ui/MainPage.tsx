import { useTranslation } from 'react-i18next'

import { Counter } from '@/entities/Counter'
import { RatingCard } from '@/entities/Rating'
import { ListBox } from '@/shared/ui/deprecated/Popups'
import { Page } from '@/widgets/Page'

const MainPage = () => {
  const { t } = useTranslation()

  return (
    <Page data-testid="MainPage">
      <div>{t('Главная')}</div>
      <RatingCard
        feedbackTitle={t('Оставьте пожайлуста ваш отзыв о статье')}
        hasFeedback
        title={t('Оцените статью')}
      />
      <div>
        <Counter />
      </div>
      <ListBox
        onChange={console.log}
        direction="top left"
        defaultValue={t('Выберите значение')}
        value={undefined}
        items={[
          { value: 'milk', content: 'milk' },
          { value: 'bread', content: 'bread' },
          { value: 'banana', content: 'banana' },
          { value: 'orange', content: 'orange', disabled: true },
          { value: 'meat', content: 'meat' },
        ]}
      />

      <ListBox
        onChange={console.log}
        direction="top right"
        defaultValue={t('Выберите значение')}
        value={undefined}
        items={[
          { value: 'milk', content: 'milk' },
          { value: 'bread', content: 'bread' },
          { value: 'banana', content: 'banana' },
          { value: 'orange', content: 'orange', disabled: true },
          { value: 'meat', content: 'meat' },
        ]}
      />
      <ListBox
        onChange={console.log}
        direction="bottom left"
        defaultValue={t('Выберите значение')}
        value={undefined}
        items={[
          { value: 'milk', content: 'milk' },
          { value: 'bread', content: 'bread' },
          { value: 'banana', content: 'banana' },
          { value: 'orange', content: 'orange', disabled: true },
          { value: 'meat', content: 'meat' },
        ]}
      />
      <ListBox
        onChange={console.log}
        direction="bottom right"
        defaultValue={t('Выберите значение')}
        value={undefined}
        items={[
          { value: 'milk', content: 'milk' },
          { value: 'bread', content: 'bread' },
          { value: 'banana', content: 'banana' },
          { value: 'orange', content: 'orange', disabled: true },
          { value: 'meat', content: 'meat' },
        ]}
      />
    </Page>
  )
}

export default MainPage
