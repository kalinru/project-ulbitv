import { render, screen } from '@testing-library/react'
import { [FTName] } from './[FTName]'

describe('[FTName].test', () => {
  test('default', () => {
    render(<[FTName]>Test</[FTName]>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
