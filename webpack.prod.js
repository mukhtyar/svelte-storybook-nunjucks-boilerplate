const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([{
      from: 'media',
      to: 'media',
      context: 'src'
    }]),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
});
