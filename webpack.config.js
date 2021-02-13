const path = require('path');
const webpack = require('webpack');




module.exports = {
  mode: 'development',
  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'public')
  },

  plugins: [new webpack.ProgressPlugin()],

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'client')],
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /.css$/,

      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  }
}