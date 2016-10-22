
var plugin = require('gauge-plugin')

var config = require('./src/config')
var store = require('./src/core/store')

module.exports = plugin('request', function (options) {
  config.init(options)

  store.createStore('request')
  store.createStore('response')

  require('./src/steps/request')
  require('./src/steps/response')
})
