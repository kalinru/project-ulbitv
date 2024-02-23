import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/shared/consts/theme'
import { Modal } from './Modal'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, veritatis. Fuga iure praesentium rem asperiores aspernatur, ratione provident, nemo nisi quas dignissimos suscipit. Ducimus sit unde sed id laudantium inventore.',
    isOpen: true
  }
}

export const Dark: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, veritatis. Fuga iure praesentium rem asperiores aspernatur, ratione provident, nemo nisi quas dignissimos suscipit. Ducimus sit unde sed id laudantium inventore.',
    isOpen: true
  },
  decorators: [ThemeDecorator(Theme.DARK)]
}
