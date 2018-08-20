const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/canvas.js',
  output: {
    filename: './lib/bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        },
      }
    ]
  },
  devtool: 'source-map'
};
