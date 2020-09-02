'use strict';
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'web',
    devtool: 'source-map',
    resolve: {
        // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: ['.ts', '.js']
    },
    stats: {
        warningsFilter: [/critical dependency:/i],
    },
  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
        }
  ]},
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "./index.js"
    },
    //target: 'web'
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new FilterWarningsPlugin({
            //exclude: /any-warnings-matching-this-will-be-hidden/
            exclude: /Critical dependency: the request of a dependency is an expression/
        }),
        new webpack.ContextReplacementPlugin(
            /\/package-name\//,
            (data) => {
                delete data.dependencies[0].critical;
                return data;
            },
        ),
    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                //pathRewrite: {'^/api' : ''}
            }
        }
    }
};
module.exports = config;
