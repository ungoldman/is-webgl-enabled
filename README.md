<div align="center">

<img src="./logo.png" width="120" height="120" alt="ice cube">

# is-webgl-enabled

Detect if WebGL is enabled in the current environment.

[![npm][npm-image]][npm-url]
[![build][build-image]][build-url]
[![downloads][downloads-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/is-webgl-enabled.svg
[npm-url]: https://www.npmjs.com/package/is-webgl-enabled
[build-image]: https://github.com/ungoldman/is-webgl-enabled/actions/workflows/tests.yml/badge.svg
[build-url]: https://github.com/ungoldman/is-webgl-enabled/actions/workflows/tests.yml
[downloads-image]: https://img.shields.io/npm/dm/is-webgl-enabled.svg

</div>

## Install

```
npm install is-webgl-enabled
```

## Usage

```js
import { isWebGLEnabled } from 'is-webgl-enabled'

if (isWebGLEnabled()) {
  // WebGL is enabled! :)
} else {
  // WebGL is not enabled! :(
}
```

By default any version counts. Pass `{ webgl2: true }` to require WebGL 2:

```js
if (isWebGLEnabled({ webgl2: true })) {
  // WebGL 2 specifically is available
}
```

## API

### `isWebGLEnabled(options?)` → `boolean`

Returns `true` if a WebGL context can be created, `false` otherwise. Safe to call
outside the browser (returns `false` when there's no `document`, e.g. during
server-side rendering).

By default it probes `webgl2`, then `webgl`, then the legacy `experimental-webgl`.
The probe context is released immediately via `WEBGL_lose_context`, since browsers
cap the number of live WebGL contexts.

#### `options.webgl2`

Type: `boolean`
Default: `false`

Require a WebGL 2 context specifically, with no fallback to WebGL 1.

## Why

I saw a few different implementations on npm, but they were either poorly documented, exported a value instead of a function, or returned an inconsistent type (such as `true` or `null`). So I made one for myself that **just works™**.

Also this became extra useful when my GPU got [blacklisted](https://codereview.chromium.org/2076443002/) by chromium (a long time ago).

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
