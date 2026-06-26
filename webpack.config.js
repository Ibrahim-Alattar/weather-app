const path = require('path');

module.exports = {
  entry: './src/dom.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: 'svg-inline-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'development'
};