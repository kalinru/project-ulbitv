import { fireEvent, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { renderComponent } from '@/shared/lib/tests/renderComponent'

describe('Sidebar', () => {
  test('render', () => {
    renderComponent(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('toggle', () => {
    renderComponent(<Sidebar />)
    const toggleButton = screen.getByTestId('sidebar-toggle')
    fireEvent.click(toggleButton)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  })
})
