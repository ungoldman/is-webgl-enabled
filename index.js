var document = require('global/document')
var window = require('global/window')

module.exports = function () {
  var c = document.createElement('canvas')
  try {
    return !!window.WebGLRenderingContext &&
      (!!c.getContext('experimental-webgl') || !!c.getContext('webgl'))
  } catch (e) {
    return false
  }
}
