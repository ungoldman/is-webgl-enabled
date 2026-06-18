import assert from 'node:assert/strict'
import test from 'node:test'
import { isWebGLEnabled } from '../src/index.ts'

interface FakeOptions {
  contexts?: string[]
  throwOnCreate?: boolean
  throwOnGet?: boolean
  throwOnGetExtension?: boolean
  loseContext?: boolean
}

let lostContexts = 0

// Stand-in DOM: createElement('canvas') yields a canvas whose getContext returns
// a fake WebGL context for whichever ids are listed in `contexts`, else null.
function fakeDocument({
  contexts = [],
  throwOnCreate = false,
  throwOnGet = false,
  throwOnGetExtension = false,
  loseContext = true
}: FakeOptions = {}) {
  return {
    createElement() {
      if (throwOnCreate) throw new Error('no canvas')
      return {
        getContext(id: string) {
          if (throwOnGet) throw new Error('context blew up')
          if (!contexts.includes(id)) return null
          return {
            getExtension(name: string) {
              if (throwOnGetExtension) throw new Error('getExtension blew up')
              if (name === 'WEBGL_lose_context' && loseContext) {
                return {
                  loseContext() {
                    lostContexts++
                  }
                }
              }
              return null
            }
          }
        }
      }
    }
  }
}

const g = globalThis as { document?: unknown }

function withDocument(doc: unknown | undefined, fn: () => void) {
  const had = 'document' in g
  const prev = g.document
  if (doc === undefined) delete g.document
  else g.document = doc
  try {
    fn()
  } finally {
    if (had) g.document = prev
    else delete g.document
  }
}

test('returns false with no document (non-browser environment)', () => {
  withDocument(undefined, () => {
    assert.equal(isWebGLEnabled(), false)
  })
})

test('returns true when a webgl2 context is available', () => {
  withDocument(fakeDocument({ contexts: ['webgl2'] }), () => {
    assert.equal(isWebGLEnabled(), true)
  })
})

test('falls back to webgl when webgl2 is unavailable', () => {
  withDocument(fakeDocument({ contexts: ['webgl'] }), () => {
    assert.equal(isWebGLEnabled(), true)
  })
})

test('falls back to experimental-webgl as a last resort', () => {
  withDocument(fakeDocument({ contexts: ['experimental-webgl'] }), () => {
    assert.equal(isWebGLEnabled(), true)
  })
})

test('returns false when no context can be created', () => {
  withDocument(fakeDocument({ contexts: [] }), () => {
    assert.equal(isWebGLEnabled(), false)
  })
})

test('webgl2 option requires a webgl2 context', () => {
  withDocument(fakeDocument({ contexts: ['webgl2'] }), () => {
    assert.equal(isWebGLEnabled({ webgl2: true }), true)
  })
})

test('webgl2 option does not fall back to webgl1', () => {
  withDocument(fakeDocument({ contexts: ['webgl'] }), () => {
    assert.equal(isWebGLEnabled({ webgl2: true }), false)
  })
})

test('returns false when canvas creation throws', () => {
  withDocument(fakeDocument({ throwOnCreate: true }), () => {
    assert.equal(isWebGLEnabled(), false)
  })
})

test('returns false when getContext throws', () => {
  withDocument(fakeDocument({ throwOnGet: true }), () => {
    assert.equal(isWebGLEnabled(), false)
  })
})

test('releases the probe context when the extension is available', () => {
  withDocument(fakeDocument({ contexts: ['webgl2'] }), () => {
    const before = lostContexts
    assert.equal(isWebGLEnabled(), true)
    assert.equal(lostContexts, before + 1)
  })
})

test('does not throw when WEBGL_lose_context is unavailable', () => {
  withDocument(fakeDocument({ contexts: ['webgl2'], loseContext: false }), () => {
    assert.equal(isWebGLEnabled(), true)
  })
})

test('still reports true when releasing the probe context throws', () => {
  withDocument(fakeDocument({ contexts: ['webgl2'], throwOnGetExtension: true }), () => {
    assert.equal(isWebGLEnabled(), true)
  })
})
