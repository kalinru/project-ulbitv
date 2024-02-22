import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ErrorBoundary } from '@/app/providers/ErrorBoundry'
import App from '@/app/App'
import '@/shared/config/i18n/i18n'
import '@/app/styles/index.scss'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')

if (!container) {
  throw new Error('There is no root container. React app was not mounted')
}

const root = createRoot(container)

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
