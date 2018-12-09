/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const npmCfg = require('../package.json');
const projectRoot = path.resolve(__dirname, '../');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

var banner = [
  'vue-flex-carousel v' + npmCfg.version,
  '(c) ' + (new Date().getFullYear()) + ' ' + npmCfg.author,
  npmCfg.homepage
].join('\n')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-flex-carousel.js',
    library: 'VueFlexCarousel',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    }
  },
  resolveLoader: {
    modules: [
      path.join(__dirname, '../node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //       // plugins: ['@babel/plugin-proposal-object-rest-spread']
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage'
            }]
          ],
          comments: false
        },
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'vue-style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
    new VueLoaderPlugin()
  ]
}
