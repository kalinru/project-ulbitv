import { type Story } from '@storybook/react'
import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from 'shared/config/i18n/i18n'

// eslint-disable-next-line react/display-name
export const TranslationDecorator = (Story: Story): JSX.Element => (
  <I18nextProvider i18n={i18n}>
    <Suspense fallback=''>
      <Story />
    </Suspense>
  </I18nextProvider>
)
