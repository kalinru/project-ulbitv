import { render, screen } from '@testing-library/react'
import ArticleEditPage from './ArticleEditPage'

describe('ArticleEditPage.test', () => {
  test('default', () => {
    render(<ArticleEditPage>Test</ArticleEditPage>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
