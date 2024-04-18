import type webpack from 'webpack'
import { BuildOptions } from '../types/config'
import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx?: boolean
}

export function buildBabelLoader ({isDev, isTsx}: BuildBabelLoaderProps): webpack.RuleSetRule {
  const isProd = !isDev
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          // [
          //   'i18next-extract',
          //   {
          //     locales: ['ru', 'en'],
          //     keyAsDefaultValue: true,
          //     outputPath: 'public/locales/{{locale}}/{{ns}}.json'
          //   }
          // ],
          [
            '@babel/plugin-transform-typescript',
            {
              isTSX: isTsx
            }
          ],
          '@babel/plugin-transform-runtime',
          isTsx && isProd && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid']
            }
          ],
          isDev && require.resolve('react-refresh/babel')
        ].filter(Boolean)
      }
    }
  }
}
