import { type ReactNode } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from 'shared/config/i18n/i18nForTests'
import { type StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export interface RenderComponent {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export function renderComponent (component: ReactNode, options: RenderComponent = {}) {
  const {
    route = '/',
    initialState
  } = options

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState}>
        <I18nextProvider i18n={i18n}>
          { component }
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
