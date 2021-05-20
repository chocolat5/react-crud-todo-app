const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false,
              // modules: true,
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer({
                  overrideBrowserslist: ['last 4 versions'],
                  grid: 'autoplace'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};