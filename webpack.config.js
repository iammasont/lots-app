const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './lots-app/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'lots-app/public'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'lots-app/src/index.html'),
      filename: 'index.html',
    }),
    // You can keep CopyPlugin if you want the CSS files available separately,
    // but it's not necessary with style-loader and css-loader
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'lots-app/src/styles'), 
          to: path.resolve(__dirname, 'lots-app/public/styles') 
        },
      ],
    }),
  ],
  devtool: 'source-map',
};