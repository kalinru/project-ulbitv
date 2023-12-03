import type webpack from 'webpack'
import { type BuildOptions } from './types/config'
import { buildCssLOader } from './loaders/buildCssLoader'

export function buildLoader ({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  // Для jsx нужен babel-loader. Но т.к. работаем с ts и tsx не нужно. ts-loader поддерживает tsx
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  const cssLoader = buildCssLOader(isDev)

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack']
  }

  const fileLOader = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }

  const babelLoader = {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          [
            'i18next-extract',
            {
              localles: ['ru-RU', 'en'],
              keyAsDefaultValue: true
            }
          ]
        ]
      }
    }
  }

  // Настройка i18next-extractor для того, чтобы новые ключи записывались в файлы переводов и не перетирали существующие:
  // Для того, чтобы плагин видел файлы локализаций, можно использовать структуру ключа
  // t("locale-file:key")
  // Если у вас VSСode и установлен плагин i18n-ally, то он не хочет понимать такую структуру ключа, тогда можно использовать структуру:
  // t("key", {ns: "locale-file"})
  // эту структуру понимают все.

  // const babelLoader = {
  //     test: /\.(js|jsx|ts|tsx)$/,
  //     exclude: /node_modules/,
  //     use: {
  //         loader: 'babel-loader',
  //         options: {
  //         presets: ['@babel/preset-env'],
  //         plugins: [
  //             [
  //                 'i18next-extract',
  //                 {
  //                     locales: ['en', 'fr'],
  //                     keyAsDefaultValue: false,
  //                     saveMissing: true,
  //                     outputPath: 'public/locales/{{locale}}/{{ns}}.json',
  //                 },
  //             ],
  //         ],
  //         },
  //     },
  // };

  return [
    babelLoader,
    typescriptLoader,
    cssLoader,
    svgLoader,
    fileLOader
  ]
}
