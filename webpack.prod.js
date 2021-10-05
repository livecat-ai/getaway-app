const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

// import 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CleanWebpackPlugin from 'clean-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import WorkboxPlugin from 'workbox-webpack-plugin';


module.exports = {
    mode: 'production',
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
        new MiniCssExtractPlugin(),
        new WorkboxPlugin.GenerateSW(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // CSS and SASS
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
            },
        ],
    },
}