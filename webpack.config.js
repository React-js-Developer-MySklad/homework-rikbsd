const path = require('path');
const resolve = path.resolve;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: './main.tsx',
    context: resolve(__dirname, 'src'),
    resolve: {
        // Подключаем jsx, ts, tsx расширения, чтобы можно было делать import модеулей
        // https://webpack.js.org/configuration/resolve/#resolveextensions
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jt)x?/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            }
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(__dirname, 'tsconfig.json')
            }
        }),
    ]
};
