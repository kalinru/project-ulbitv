import type { Meta, StoryObj } from '@storybook/react'
import { CountrySelect } from './CountrySelect'
import { Country } from '../../model/types/country'

const meta = {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof CountrySelect>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    value: Country.Russian
  }
}
