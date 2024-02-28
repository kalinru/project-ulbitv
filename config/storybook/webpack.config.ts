import { DefinePlugin, type RuleSetRule } from 'webpack'
import type webpack from 'webpack'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { type BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
    locales: '',
    buildLocales: '',
  }

  config!.resolve!.modules!.unshift(paths.src)
  config!.resolve!.extensions!.push('.ts', '.tsx')
  config!.resolve!.alias = {
    ...config!.resolve!.alias,
    '@': paths.src,
  }

  // remove svg from existing rule
  // @ts-ignore rule: RuleSetRule
  config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
    if (
      String(rule.test) ===
      String(
        /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      )
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      }
    }

    return rule
  })

  // use svgr for svg files
  config!.module!.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  })
  config!.module!.rules.push(buildCssLoader({ isDev: true }))

  config.plugins?.push(
    new DefinePlugin({
      __IS_DEV__: JSON.stringify(true),
      __API__: JSON.stringify('http://localhost:8000'),
      __PROJECT__: JSON.stringify('storybook'),
    }),
  )

  // config.resolve.alias = {
  //   entities: path.resolve(__dirname, "..", "..", "src", "entities"),
  // }

  return config
}
