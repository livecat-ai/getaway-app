const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    watchOptions: {
        poll: true,
        ignored: "/node_modules/"
    },
    devServer: {
        port: 8080,
        open: true,
        proxy: {
            '/': {
                target: 'http://localhost:3000/',
                secure: false,
                changeOrigin: true
            }
        },
        
    },
    entry: {
        main: path.resolve(__dirname, './src/client/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpak Boilerplate',
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    
};