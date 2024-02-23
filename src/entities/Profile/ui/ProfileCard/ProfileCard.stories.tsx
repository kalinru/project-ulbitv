import { type Meta, type StoryObj } from '@storybook/react'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import AvatarImg from '@/shared/assets/tests/avatar.png'

import { ProfileCard } from './ProfileCard'

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof ProfileCard>

export default meta
  type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    data: {
      age: 20,
      avatar: AvatarImg,
      city: 'Moscow',
      country: Country.Russian,
      currency: Currency.RUB,
      first: 'vasya',
      lastname: 'ivanov',
      username: 'vasya_ivanov'
    }
  }
}

export const Loading: Story = {
  args: {
    isLoading: true
  }
}

export const Error: Story = {
  args: {
    error: 'true'
  }
}
