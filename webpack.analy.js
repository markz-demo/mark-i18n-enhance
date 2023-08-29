const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(config, {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
