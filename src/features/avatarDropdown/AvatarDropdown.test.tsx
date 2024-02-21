import { render, screen } from '@testing-library/react'
import { AvatarDropdown } from './AvatarDropdown'

describe('AvatarDropdown.test', () => {
  test('default', () => {
    render(<AvatarDropdown/>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
