
var defaults = require('superagent-defaults')
var supertest = require('supertest')

var config = require('../config')
var app
if (config.get('server')) {
  app = require(config.get('server'))
}

function makeRequest() {
  var superagent = supertest(app || config.get('host'))
  var request = defaults(superagent)

  var defaultHeaders = config.get('headers') || {}
  for (var key in defaultHeaders) {
    request.set(key, defaultHeaders[key])
  }

  return request
}

module.exports = makeRequest
