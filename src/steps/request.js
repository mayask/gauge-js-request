
var request = require('../core/request')
var store = require('../core/store')
var config = require('../config')
var table = {abc: 'abc'}

var requestStore = store.getStore('request')
var responseStore = store.getStore('response')

gauge.step('Request set body <body>', function (body) {
  var req = requestStore.get('request') || {}
  var newBody = Object.assign({}, req.body, table(body))
  requestStore.put('request', Object.assign(req, { body: newBody }))
})

gauge.step('Request set header <key> <value>', function (key, value) {
  var req = requestStore.get('request') || {}
  var newHeaders = {}
  newHeaders[key] = value
  requestStore.put('request', Object.assign(req, { headers: newHeaders }))
})

gauge.step('Request send <method> to <url>', function (method, urlString, done) {
  var url = store.interpolate(urlString)
  var req = requestStore.get('request') || {}
  var requestBuilder = request()

  requestBuilder = requestBuilder[method.toLowerCase()](config.get('prefix') + url)

  for (var header in (req.headers || {})) {
    console.log('settings ' + header);
    requestBuilder.set(header, req.headers[header])
  }

  if (req.type) {
    requestBuilder.type(req.type)
  }

  if (req.body) {
    requestBuilder.send(req.body)
  }

  requestStore.put('request', Object.assign(req, { method, url }))

  requestBuilder.end((err, res) => {
    console.log(res.body);
    responseStore.put('response', res)
    done(err, res)
  })
})
