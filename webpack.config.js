const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    entry: {
        index: './src/index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
        clean: true,
    },
    mode: devMode ? 'development' : 'production',
    devtool: devMode ? "source-map" : false,
    target: 'web',
    cache: {
        type: 'filesystem',
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]',
                },
            },
            {
                test: /\.(json)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: path.resolve(__dirname, "./i18n-loader.js"),
                }
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            }
        ],
    },
    resolve: {
        modules: ["./node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"],
        fallback: { "crypto": false },
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './assets/index.html'),
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
            chunkFilename: "[name].[contenthash:8].css",
            ignoreOrder: true,
        }),
    ],
    optimization: {
        minimize: devMode ? false : true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10,
                },
            }
        }
    },
    experiments: { topLevelAwait: true },
};
