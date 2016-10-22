
var config = {
  host: '/',
  prefix: '',
  headers: {},
}

function setConfig(param, value) {
  config[param] = value
}

function getConfig(param) {
  return config[param]
}

function initConfig(params) {
  Object.assign(config, params)
}

module.exports = {
  set: setConfig,
  get: getConfig,
  init: initConfig,
}
