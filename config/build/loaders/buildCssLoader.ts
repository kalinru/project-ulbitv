import type webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from '../types/config'

export function buildCssLoader ({ isDev }: Partial<BuildOptions>): webpack.RuleSetRule {
  return {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\./,
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:4]'
              : '[hash:base64:8]'
          }
        }
      },
      'sass-loader'
    ]
  }
}
