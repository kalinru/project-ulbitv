import { render, screen } from '@testing-library/react'
import { Tabs } from './Tabs'

const fn = (...props: any[]) => {}

describe('Tabs.test', () => {
  test('default', () => {
    render(<Tabs tabs={[]} value='' onTabClick={fn}>Test</Tabs>)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
