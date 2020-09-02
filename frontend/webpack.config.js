/*const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');

module.exports = {
    // ... rest of webpack config
    stats: {
        warningsFilter: [/critical dependency:/i],
    },
    plugins: [
        new FilterWarningsPlugin({
            //exclude: /any-warnings-matching-this-will-be-hidden/
            exclude: /Critical dependency: the request of a dependency is an expression/
        }),
        new webpack.ContextReplacementPlugin(
            /^\.$/,
            (context) => {
                if (/\/node_modules\/mocha\/lib/.test(context.context)) {//ensure we're only doing this for modules we know about
                    context.regExp = /this_should_never_exist/
                    for (const d of context.dependencies) {
                        if (d.critical) d.critical = false;
                    }
                }
            }
        )
    ]
};

*/


'use strict';
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
//const webpack = require('webpack');
const path = require('path');
const webpack = require('webpack');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
// the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    /*output: {
        // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },*/
    devtool: 'source-map',
    /*externals: {
        vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },*/
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
    plugins: [
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

        /*new ContextReplacementPlugin(
            /^\.$/,
            (context) => {
                if (/\/node_modules\/mocha\/lib/.test(context.context)) {//ensure we're only doing this for modules we know about
                    context.regExp = /this_should_never_exist/
                    for (const d of context.dependencies) {
                        if (d.critical) d.critical = false;
                    }
                }
            }
        )*/
    ]/*
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    }*/
};
module.exports = config;
