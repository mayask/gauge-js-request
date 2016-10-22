
var store;

try {
  store = require('gauge-store')
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e
  }
  store = {
    interpolate: function (t) { return t },
    createStore: function () {},
    getStore: function () {
      return {
        get: function () { return null },
        put: function () {}
      }
    }
  }
}

module.exports = store
