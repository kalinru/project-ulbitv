import { type Meta, type StoryObj } from '@storybook/react'

import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import AvatarImg from '@/shared/assets/tests/avatar.png'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'

import ProfilePage from './ProfilePage'

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {},
  tags: ['autodocs']
} satisfies Meta<typeof ProfilePage>

export default meta
  type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
  }
}
Normal.decorators = [
  StoreDecorator({
    profile: {
      isLoading: false,
      readonly: false,
      form: {
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
  })
]

export const Dark: Story = {
  args: {
  }
}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      isLoading: false,
      readonly: false,
      form: {
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
  })
]
