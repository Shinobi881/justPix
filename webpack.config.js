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
      {test: /\.css$/, loader: 'style!css'},
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};
