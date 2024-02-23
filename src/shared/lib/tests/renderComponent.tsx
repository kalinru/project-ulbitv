import { type ReducersMapObject } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18nForTests'

export interface RenderComponent {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function renderComponent (component: ReactNode, options: RenderComponent = {}) {
  const {
    route = '/',
    initialState,
    asyncReducers
  } = options

  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <I18nextProvider i18n={i18n}>
          { component }
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}
