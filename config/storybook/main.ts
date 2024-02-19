import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-mock',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  }
  // babel: async (options) => ({
  //   ...options,
  //   presets: [
  //     '@babel/preset-env',
  //     '@babel/preset-typescript',
  //     [
  //       '@babel/preset-react',
  //       {
  //         runtime: 'automatic'
  //       }
  //     ]
  //   ]
  // })
}
export default config
