import { render, screen } from '@testing-library/react'
import { ArticleSortSelector } from './ArticleSortSelector'
import { ArticleSortField } from '../../model/types/article'

const fn = (...props: any[]) => {}

describe('ArticleSortSelector.test', () => {
  test('default', () => {
    render(<ArticleSortSelector order='asc' sort={ArticleSortField.CREATED} onChangeOrder={fn} onChangeSort={fn}>Test</ArticleSortSelector>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
