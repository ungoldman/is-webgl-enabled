# is-webgl-enabled

Detect if WebGL is enabled in the current environment.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/is-webgl-enabled.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/is-webgl-enabled
[travis-image]: https://img.shields.io/travis/ungoldman/is-webgl-enabled.svg?style=flat-square
[travis-url]: https://travis-ci.org/ungoldman/is-webgl-enabled
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install is-webgl-enabled
```

## Usage

```js
var document = require('global/document')
var isWebGlEnabled = require('../')

if (isWebGlEnabled()) {
  document.write('WebGL is enabled! :)')
} else {
  document.write('WebGL is not enabled! :(')
}
```

## Why

I saw a few different implementations on npm, but they were either poorly documented, exported a value instead of a function, or returned an inconsitent type (such as true or null). So I made one for myself that **just works™**.

Also this became extra useful when my GPU got [blacklisted](https://codereview.chromium.org/2076443002/) by chromium.

## Contributing

Contributions welcome! Please read the [contributing guidelines](contributing.md) first.

## License

[ISC](license.md)
