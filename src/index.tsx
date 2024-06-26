import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from '@/app/App'
import { ErrorBoundary } from '@/app/providers/ErrorBoundry'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'

import '@/shared/config/i18n/i18n'
import '@/app/styles/index.scss'
import { ForceUpdateProvider } from './shared/lib/render/forceUpdate'

const container = document.getElementById('root')

if (!container) {
  throw new Error('There is no root container. React app was not mounted')
}

const root = createRoot(container)

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ForceUpdateProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ForceUpdateProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
)
