const path = require('path');
const webpack = require('webpack');
const nunjucks = require('nunjucks');
const glob_entries = require('webpack-glob-folder-entries');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = require('./build_scripts/pages.generate.js');
const data = require('./build_scripts/pages.data.js');
const nunjucksFilters = require('./src/templates/filters');
const isProd = process.env.NODE_ENV === 'production';

const buildPath = path.resolve(__dirname, 'public');

// Add new entry points here. 
// Entry point name for tools should be same as html template it will be injected into
const entryPoints = {
  main: './src/js/main.js',
  'my-map-tool': './src/js/tools/my-map-tool.js',
};

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
  entry: entryPoints,
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
          name: '[path][name].[ext]',
          context: 'src'
        }
      },
      {
        test: /\.html$/,
        exclude : /node_modules/,
        use : [
          'html-loader',
          {
            loader  : path.resolve(__dirname, path.join(__dirname, './build_scripts/nunjucks-html-loader.js')),
            options: {
              searchPaths: [...returnEntries('./src/templates/**/')],
              context: data,
              filters: nunjucksFilters,
            },
          },
        ]
      },
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
    ...pages.generateTopLevelPages(path.resolve(__dirname, path.join(__dirname, './src/pages'))),
    ...pages.generateSecondLevelPages(path.resolve(__dirname, path.join(__dirname, './src/pages')), entryPoints),
    pages.generateBlogIndexPage(path.resolve(__dirname, path.join(__dirname, './src/blog'))),
    ...pages.generateBlogPostPages(path.resolve(__dirname, path.join(__dirname, './src/blog')), data.posts),
  ]
}
