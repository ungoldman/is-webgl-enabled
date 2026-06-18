# is-webgl-enabled change log

All notable changes to this project will be documented in this file. This project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0](https://github.com/ungoldman/is-webgl-enabled/compare/v1.0.2...v2.0.0) (2026-06-18)


### ⚠ BREAKING CHANGES

* ESM-only.
    - Import it as `import { isWebGLEnabled } from 'is-webgl-enabled'`.

### Build System

* convert to TypeScript and ESM ([#1](https://github.com/ungoldman/is-webgl-enabled/issues/1)) ([e90cc74](https://github.com/ungoldman/is-webgl-enabled/commit/e90cc74383328123339fadb8e3e15a12e0edd990))

## 1.0.2

- remove unnecessary `global` module from usage example

## 1.0.1

- use `global/document` and `global/window` to support non-browser environments
- fix typo in example
- add browser test

## 1.0.0

- init
