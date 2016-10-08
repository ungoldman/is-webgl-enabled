module.exports = function () {
  var c = document.createElement('canvas')
  try {
    return !!window.WebGLRenderingContext &&
      (!!c.getContext('experimental-webgl') || !!c.getContext('webgl'))
  } catch (e) {
    return false
  }
}
