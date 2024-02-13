import { render, screen } from '@testing-library/react'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'

describe('ArticleDetailsPageHeader.test', () => {
  test('default', () => {
    render(<ArticleDetailsPageHeader>Test</ArticleDetailsPageHeader>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
