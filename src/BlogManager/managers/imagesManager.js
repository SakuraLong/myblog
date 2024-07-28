import { uploadImages, getImageUrls, renameImage } from '@/api/media'
import { message } from '@/utils/utils'

class ImagesManager {
  constructor(bm, sm) {
    this.bm = bm
    this.sm = sm

    /**
     * key idEn
     * value image urls []
     */
    this.imagesMap = new Map()
  }

  uploadImages(files, idEn) {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i])
    }
    formData.append('id_en', idEn)
    return uploadImages(formData)
  }

  async getImageUrls(idEn, force) {
    if (!force && this.imagesMap.has(idEn)) return this.imagesMap.get(idEn)
    const res = await getImageUrls({ id_en: idEn }).then((res) => {
      res.urls.forEach((item) => {
        item[0] = process.env.VUE_APP_BASE_API + item[0].slice(1)
      })
      return res.urls
    }).catch((err) => {
      message(err)
      return null
    })
    if (res) {
      this.imagesMap.set(idEn, res)
    }
    return res || []
  }

  renameImage(oldName, newName, idEn) {
    return renameImage({
      old: oldName,
      new: newName,
      id_en: idEn
    })
  }
}

export default ImagesManager
