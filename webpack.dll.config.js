const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['./dll'],
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: 'MyDll.[name].js',
    library: '[name]_[hash]',
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.join(__dirname, './dll'),
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
};
