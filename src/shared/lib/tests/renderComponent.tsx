import { type ReactNode } from 'react'

import { type ReducersMapObject } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'

import { type StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line ulbi-tv-plugin-kalinru/fsd-layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import i18n from '@/shared/config/i18n/i18nForTests'
import { Theme } from '@/shared/consts/theme'
// eslint-disable-next-line ulbi-tv-plugin-kalinru/fsd-layer-imports
import '@/app/styles/index.scss'

export interface RenderComponent {
  route?: string
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  theme?: Theme
}

interface TestProviderProps {
  children: ReactNode
  options?: RenderComponent
}

export function TestProvider (props: TestProviderProps) {
  const { children, options = {} } = props
  const {
    route = '/',
    initialState,
    asyncReducers,
    theme = Theme.LIGHT
  } = options

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers}
                     initialState={initialState}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  )
}

export function renderComponent (component: ReactNode, options: RenderComponent = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>)
}
