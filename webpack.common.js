// For a detailed explanation regarding each configuration property, visit:
// https://webpack.js.org/configuration/#options

const path = require('path');

/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        home: './index.tsx',
    },
    module: {
        rules: [
            {
                test: /\.html?$/,
                use: 'html-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, /\.test.tsx?$/],
            },
            {
                test: /\.(sc|sa|c)ss?$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.ejs',
            templateParameters: {
                pageTitle: '',
            },
        }),
    ],
};
