const cfg = require('../config/config').get(process.env.NODE_ENV)
const moment = require('moment')

function genTid () {
  return cfg.node_name + '-' + moment().format('YYMMDD') + new Array(11).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  })
}

function genJWTId () {
  return new Array(12).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  })
}

function genXsession () {
  return new Array(22).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  })
}

module.exports = {
  genTid: genTid,
  genJWTId: genJWTId,
  genXsession: genXsession
}
