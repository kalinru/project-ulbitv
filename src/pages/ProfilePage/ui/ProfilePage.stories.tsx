import { type Meta, type StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'
import ProfilePage from './ProfilePage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import AvatarImg from '@/shared/assets/tests/avatar.png'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'centered'
  },
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
