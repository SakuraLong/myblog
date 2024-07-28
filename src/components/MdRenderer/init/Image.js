function initImage(md, vue, meta) {
  const baseUrl = meta ? (meta.baseUrl || '') : ''
  const defaultImage = md.renderer.rules.image
  function image(tokens, idx, options, env, slf) {
    const url = tokens[idx].attrGet('src') || ''
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('data:image') ||
      url.startsWith('file://') ||
      url.startsWith('blob:')
    ) {
      return defaultImage(tokens, idx, options, env, slf)
    } else {
      tokens[idx].attrSet('src', baseUrl + url)
      return defaultImage(tokens, idx, options, env, slf)
    }
  }
  md.renderer.rules.image = image
}

export default [
  initImage
]
