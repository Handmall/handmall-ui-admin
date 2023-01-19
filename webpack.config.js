const path = require('path');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif|woff2|woff|eot|ttf|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new ForkTsCheckerPlugin({
            async: false
        }),
        new HtmlPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new ESLintPlugin({
            extensions: ['ts', 'tsx']
        })
    ]
}