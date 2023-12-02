import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLOader (isDev: boolean)  {
    return {
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
                    : '[hash:base64:8]'
                }
            }
            },
            'sass-loader'
        ]
    }
}