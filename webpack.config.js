const path = require('path');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, './src');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.join(SRC_DIR, 'index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                include: SRC_DIR,
                loader: 'ts-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.scss', '.json']
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
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
            extensions: ['ts', 'tsx'],
            overrideConfigFile: path.resolve(__dirname, '.eslintrc.json'),
            fix: false,
            emitError: true,
            emitWarning: true,
            failOnWarning: false,
            failOnError: true
        })
    ]
}