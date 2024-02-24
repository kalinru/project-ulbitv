import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false, // 👈 disable the backgrounds addon
      },
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock',
    'storybook-addon-themes',
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
