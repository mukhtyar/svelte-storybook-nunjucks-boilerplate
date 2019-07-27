const path = require('path');
const webpack = require('webpack');
const glob_entries = require('webpack-glob-folder-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = require('./pages.generate.js');
const buildPath = path.resolve(__dirname, 'public');
const isProd = process.env.NODE_ENV === 'production';

// Webpack doesn't support glob paths. For the nunjucks-html-loader
// we need each path to be specified for it to work (even subdirectories)
function returnEntries(globPath){
  let entries = glob_entries(globPath, true);
  let folderList = new Array();
  for (let folder in entries){
     folderList.push(path.join(__dirname, entries[folder]));
  }
  return folderList;
}

module.exports = {
  entry: {
    main: './src/js/main.js',
    'annual-averages': './src/js/tools/annual-averages.js',
  },
  output: {
    filename: isProd ? 'js/[name].[contenthash].js' : 'js/[name].js',
    path: buildPath
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          hotReload: true
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: isProd ? '[path][name].[contenthash].[ext]' : '[path][name].[ext]',
          context: 'src'
        }
      },
      {
        test: /\.html$/,
        exclude : /node_modules/,
        use : [
          'html-loader',
          {
            loader  : "nunjucks-html-loader",
            options : {
              // Other super important. This will be the base
              // directory in which webpack is going to find
              // the layout and any other file index.njk is calling.
              searchPaths: [...returnEntries('./src/pages/templates/**/')],
              context: require('./pages.data.js')
              // Use the one below if you want to use a single path.
              // searchPaths: ['./client/templates'],
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: 'static',
      context: 'src'
    }]),
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
    }),
    ...pages.generatePages(path.resolve(__dirname, path.join(__dirname, './src/pages'))),
/*    new HtmlWebpackPlugin({
      template: 'nunjucks-html-loader!./src/pages/index.html',
      inject: 'body',
      chunks: ['main'],
      filename: 'index.html'
    })*/
  ]
/*  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    alias: {
      '@': path.resolve(__dirname, './'),
      styles: path.resolve(__dirname, './styles')
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  },*/
}
