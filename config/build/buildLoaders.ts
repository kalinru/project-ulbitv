import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoader({ isDev }: BuildOptions): webpack.RuleSetRule[] {

    // Для jsx нужен babel-loader. Но т.к. работаем с ts и tsx не нужно. ts-loader поддерживает tsx
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module\./,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:4]'
                            : '[hash:base64:8]',
                    },
                }
            },
            'sass-loader',
        ],
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}