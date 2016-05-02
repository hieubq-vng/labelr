require('babel-core/register')

var fs = require('fs')
var webpack = require('webpack')
var getConfig = require('hjs-webpack')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var PublicPage = require('./src/pages/public').default
var Layout = require('./src/layout').default

var config = getConfig({
  in: 'src/app.js',
  out: 'public',
  clearBeforeBuild: true,
  isDev: process.env.NODE_ENV !== 'production',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // module: {
  //   loaders: [
  //     {
  //       test: /\.css$/,
  //       loaders: ['style', 'css']
  //     },
  //     {
  //       test: /\.styl$/,
  //       loaders: ['style', 'stylus']
  //     },
  //     {
  //       test: /\.jsx$/,
  //       loaders: ['babel']
  //     }
  //   ]
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  html: function (context) {
    const publicPage = ReactDOMServer.renderToString(React.createElement(PublicPage))
    const layoutPage = ReactDOMServer.renderToString(React.createElement(Layout, {me: {}}))

    return {
      'index.html': context.defaultTemplate({html: `<div id='root'>${publicPage}</div>`}),
      '200.html': context.defaultTemplate({html: `<div id='root'>${layoutPage}</div>`})
    }
  }
})

// Having hmre present in the .babelrc will break with the `babel-core/register` above
// so wait until that is done and then add it here via the loader query
const babelrc = JSON.parse(fs.readFileSync('./.babelrc'))
babelrc.env = {development: {presets: ['react-hmre']}}
config.module.loaders[0].query = babelrc

module.exports = config
