var document = require('global/document')
var isWebGlEnabled = require('../')

if (isWebGlEnabled()) {
  document.querySelector('.result').innerHTML = '🖖😁 WebGL is enabled! 😅👍'
  document.title = 'WebGL: yep'
} else {
  document.querySelector('.result').innerHTML = '👊😭 WebGL is not enabled! 😖👎'
  document.title = 'WebGL: nope'
}
