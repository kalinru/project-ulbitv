import { render, screen } from '@testing-library/react'
import { ArticlePageFilter } from './ArticlePageFilter'

describe('ArticlePageFilter.test', () => {
  test('default', () => {
    render(<ArticlePageFilter>Test</ArticlePageFilter>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
