import { screen } from '@testing-library/react'

import { UserRole } from '@/entities/User'
import { RoutePath } from '@/shared/consts/router'
import { renderComponent } from '@/shared/lib/tests/renderComponent'

import AppRouter from './AppRouter'

describe('app/router/AppRouter', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  test('Страница отрендерилась', async () => {
    renderComponent(<AppRouter />, {
      route: RoutePath.about(),
    })

    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  // TODO тест почему то не проходит
  // test('Страница не айдена', async () => {
  //   renderComponent(<AppRouter />, {
  //     route: 'page_does_not_exist_fasf321qf1q'
  //   })

  //   const page = await screen.findByTestId('NotFoundPage')
  //   expect(page).toBeInTheDocument()
  // })

  test('Редирект неавторизованного пользователя на главную', async () => {
    renderComponent(<AppRouter />, {
      route: RoutePath.profile('1'),
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
    renderComponent(<AppRouter />, {
      route: RoutePath.profile('1'),
      initialState: {
        user: { inited: true, authData: {} },
      },
    })

    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ запрещен (отсутствует роль)', async () => {
    renderComponent(<AppRouter />, {
      route: RoutePath.admin_panel(),
      initialState: {
        user: { inited: true, authData: {} },
      },
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ разрешен (присутствует роль)', async () => {
    renderComponent(<AppRouter />, {
      route: RoutePath.admin_panel(),
      initialState: {
        user: { inited: true, authData: { roles: [UserRole.ADMIN] } },
      },
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})
