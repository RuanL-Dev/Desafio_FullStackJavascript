const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-scripts': resolve(__dirname, 'node_modules/react-scripts'),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/index.html', to: 'index.html' }
      ]
    }),
    new webpack.DefinePlugin({ "global.GENTLY": false }),
  ],
  devServer: {
    contentBase: './dist/index.html',
    port: 3000,
  },
};