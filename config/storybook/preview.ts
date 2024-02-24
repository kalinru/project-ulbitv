import type { Preview } from '@storybook/react'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator'
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { Theme } from '../../src/shared/consts/theme'
import '../../src/app/styles/index.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    layout: 'fullscreen',
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: ['app', Theme.LIGHT], color: '#dddddd' },
        { name: 'dark', class: ['app', Theme.DARK], color: '#333333' },
        { name: 'contrast', class: ['app', Theme.CONTRAST], color: '#aaaaaa' }
      ],
    },
  },
  decorators: [
    StyleDecorator,
    // ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator
  ]
}

export default preview
