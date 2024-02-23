import { Button, ButtonSize, ButtonTheme } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button'
  }
}

export const Clear: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.CLEAR
  }
}

export const Outline: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.OUTLINE
  }
}

export const OutlineSizeL: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L
  }
}

export const OutlineSizeXL: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL
  }
}

export const Background: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.BACKGROUND
  }
}

export const BackgroundInverted: Story = {
  args: {
    children: 'Button',
    theme: ButtonTheme.BACKGROUND_INVERTED
  }
}

export const Square: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true
  }
}

export const SquareSizeL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.L
  }
}

export const SquareSizeXL: Story = {
  args: {
    children: '>',
    theme: ButtonTheme.BACKGROUND_INVERTED,
    square: true,
    size: ButtonSize.XL
  }
}

export const Disabled: Story = {
  args: {
    children: 'disabled',
    theme: ButtonTheme.OUTLINE,
    disabled: true
  }
}
