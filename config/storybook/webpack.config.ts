import { type RuleSetRule } from 'webpack'
import type webpack from 'webpack'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { type BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  config.resolve.modules.unshift(paths.src)
  config.resolve.extensions.push('.ts', '.tsx')

  // remove svg from existing rule
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (
      String(rule.test) ===
    String(
      /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    )
    ) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
      }
    }

    return rule
  })

  // use svgr for svg files
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack']
  })
  config.module.rules.push(buildCssLoader(true))

  // config.resolve.alias = {
  //   entities: path.resolve(__dirname, "..", "..", "src", "entities"),
  // }

  return config
}
