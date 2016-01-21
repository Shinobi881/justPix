// Webpack config
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './app/app.js',
  watch: true,
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  plugins: [
    new LiveReloadPlugin({port:35729, appendScriptTag: true})
  ],
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
};
