import type webpack from 'webpack'

export function buildBabelLoader (isDev: boolean): webpack.RuleSetRule {
  return {
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
          ],
          isDev && require.resolve('react-refresh/babel')
        ].filter(Boolean)
      }
    }
  }
}
