const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: 1000,
  //   ignored: /node_modules/
  // },
  devServer: {
    port: 8000,
    contentBase: path.join(__dirname, '/src'),
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    watchContentBase: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
    ],
  },
});
