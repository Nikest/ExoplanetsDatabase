const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const outputDirectory = 'public';

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.tsx'],
    },

    output: {
        path: path.join(__dirname, outputDirectory),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    devServer: {
        port: 3005,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs'
        })
    ]
};
