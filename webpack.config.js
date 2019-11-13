const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const handler = (percentage, message, ...args) => {
  console.time('a');
  console.info(percentage, message, ...args);
  console.timeEnd('a');
};


module.exports = {
  mode: 'development',
  entry: './index.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, './dll'),
      manifest: require('./dll/vendor-manifest.json'), // eslint-disable-line
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new webpack.ProgressPlugin(handler),
  ],
};
