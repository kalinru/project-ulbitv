import { render, screen } from '@testing-library/react'
import { ArticleTypeTabs } from './ArticleTypeTabs'
import { ArticleType } from 'entities/Article/model/types/article'

const fn = (...props: any[]) => {}

describe('ArticleTypeTabs.test', () => {
  test('default', () => {
    render(<ArticleTypeTabs value={ArticleType.ALL} onChangeType={fn}>Test</ArticleTypeTabs>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
