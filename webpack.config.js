'use strict';

const path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/js/index.ts',
    output: {
        path: path.resolve(__dirname, 'public/dist/js'),
        filename: '[name].js',
        publicPath: '/'
    },

    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },

    watch: false,

    watchOptions: {
        aggregateTimeout: 100
    },

    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public'
    }
};
