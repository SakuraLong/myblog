class FontsManager {
  constructor(bm) {
    this.bm = bm
    this.fonts = [
      ['Note-Script-Medium', 'url(' + require('@/assets/css/fonts/Note-Script-Medium-2.ttf') + ')'],
      ['Interm', 'url(' + require('@/assets/css/fonts/Inter.woff2') + ')']
    ]
    this.readyPromise = this.init()
  }
  init() {
    return new Promise((resolve, reject) => {
      const all = []
      this.fonts.forEach((font) => {
        all.push(this.load(font[0], font[1]))
      })
      Promise.all(all).then((res) => {
        res.forEach((loadedFace) => {
          this.add(loadedFace)
        })
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }
  load(name, src) {
    const font = new FontFace(name, src)
    return font.load()
  }
  add(loadedFace) {
    document.fonts.add(loadedFace)
  }
}

export default FontsManager
