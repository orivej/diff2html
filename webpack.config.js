// Webpack config
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {test: /\.mustache$/, loader: 'mustache'}
    ]
  }
};
