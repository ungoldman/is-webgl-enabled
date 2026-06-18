export interface IsWebGLEnabledOptions {
  /**
   * Require WebGL 2 specifically. By default any version counts, probing
   * `webgl2`, then `webgl`, then the legacy `experimental-webgl`.
   */
  webgl2?: boolean
}

/** Detect if WebGL is enabled in the current environment. */
export function isWebGLEnabled(options: IsWebGLEnabledOptions = {}): boolean {
  if (typeof document === 'undefined') return false

  const ids: string[] = options.webgl2 ? ['webgl2'] : ['webgl2', 'webgl', 'experimental-webgl']

  try {
    const canvas = document.createElement('canvas')
    let gl: RenderingContext | null = null
    for (const id of ids) {
      gl = canvas.getContext(id)
      if (gl) break
    }
    if (!gl) return false
    // release the probe context (best-effort); browsers cap live WebGL contexts
    releaseContext(gl)
    return true
  } catch {
    return false
  }
}

// A cleanup failure must not flip a successful detection, so this is isolated
// from the probe and swallows its own errors.
function releaseContext(gl: RenderingContext): void {
  try {
    const lose = (gl as WebGLRenderingContext | WebGL2RenderingContext).getExtension(
      'WEBGL_lose_context'
    )
    lose?.loseContext()
  } catch {
    // ignored: releasing the probe context is opportunistic
  }
}
