const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const PORT = process.env.PORT || '8080';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    compress: true,
    contentBase: './dist',
    hot: true,
    port: PORT
  }
});