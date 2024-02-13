import { render, screen } from '@testing-library/react'
import { Page } from './Page'

describe('Page.test', () => {
  test('default', () => {
    render(<Page>Test</Page>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
