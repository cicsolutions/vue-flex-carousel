/* eslint-disable */

// const webpack = require('webpack')
const merge = require('webpack-merge');
const base = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'vue-flex-carousel.min.js'
  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false
    })
  ]
});
