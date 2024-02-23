import { Country } from '../../model/types/country'

import { CountrySelect } from './CountrySelect'

import type { Meta, StoryObj } from '@storybook/react'

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
