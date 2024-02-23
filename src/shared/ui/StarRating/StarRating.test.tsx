import { render, screen } from '@testing-library/react'
import { StarRating } from './StarRating'

describe('StarRating.test', () => {
  test('default', () => {
    render(<StarRating>Test</StarRating>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
