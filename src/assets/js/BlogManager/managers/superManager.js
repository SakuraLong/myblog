import LRUCache from '@/utils/lru'
import { getCategories } from '@/api/blog'
import { getPosts, getPost, createDraft, updateCategories } from '@/api/blogManage'
import { deepClone, convertKeysToCamelCase, convertKeysToSnakeCase, message } from '@/utils/utils'
import BlogManager from '..'
import ImagesManager from './imagesManager'

class DraftsManager {
  constructor(bm, sm) {
    this.bm = bm
    this.sm = sm

    this.postsList = []

    /**
     * only save drafts
     * key = id
     * value = blog
     */
    this.posts = new LRUCache(50)
  }

  init(posts) {
    this.postsList = posts.filter((post) => post.draft)
  }

  async getPostById(id) {
    if (this.posts.has(id)) return this.posts.get(id)
    const res = await getPost({ id: id }).then((res) => {
      return BlogManager.decorator.readingTime(
        BlogManager.decorator.time(
          BlogManager.decorator.to(
            BlogManager.decorator.wordCount(
              convertKeysToCamelCase(res)
            )
          )
        )
      )
    }).catch((err) => {
      message('检索文章失败:' + err)
      return {}
    })
    this.posts.set(id, res)
    return res
  }

  getPostByIdSync(id) {
    return this.posts.get(id)
  }

  async getPostByIdEn(idEn) {
    const id = this.sm.idEnMap.get(idEn)
    if (id) {
      return await this.getPostById(id)
    } else {
      throw new Error('idEn不存在或idEn-id表构建失败')
    }
  }

  getPostByIdEnSync(idEn) {
    const id = this.sm.idEnMap.get(idEn)
    if (id) {
      return this.getPostByIdSync(id)
    } else {
      throw new Error('idEn不存在或idEn-id表构建失败')
    }
  }

  getPostsList() {
    return deepClone(this.postsList)
  }

  create(post) {
    if (!post.title) return 0
    if (!post.idEn) return 0
    if (this.sm.hasByIdEn(post.idEn)) return 1
    if (!post.titlePinyin) return 0
    if (!post.author) return 0
    return new Promise((resolve, reject) => {
      createDraft(convertKeysToSnakeCase({ post: post })).then((res) => {
        this.sm.init()
        this.sm.readyPromise.then(() => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        resolve(err)
      })
    })
  }
}

class PostsManager {
  constructor(bm, sm) {
    this.bm = bm
    this.sm = sm

    this.postsList = []

    /**
     * only save no drafts
     * key = id
     * value = blog
     */
    this.posts = new LRUCache(50)
  }

  init(posts) {
    this.postsList = posts.filter((post) => !post.draft)
  }

  async getPostById(id) {
    if (this.posts.has(id)) return this.posts.get(id)
    const res = await getPost({ id: id }).then((res) => {
      return BlogManager.decorator.readingTime(
        BlogManager.decorator.time(
          BlogManager.decorator.to(
            BlogManager.decorator.wordCount(
              convertKeysToCamelCase(res)
            )
          )
        )
      )
    }).catch((err) => {
      message('检索文章失败:' + err)
      return {}
    })
    this.posts.set(id, res)
    return res
  }

  getPostByIdSync(id) {
    return this.posts.get(id)
  }

  async getPostByIdEn(idEn) {
    const id = this.sm.idEnMap.get(idEn)
    if (id) {
      return await this.getPostById(id)
    } else {
      throw new Error('idEn不存在或idEn-id表构建失败')
    }
  }

  getPostByIdEnSync(idEn) {
    const id = this.sm.idEnMap.get(idEn)
    if (id) {
      return this.getPostByIdSync(id)
    } else {
      throw new Error('idEn不存在或idEn-id表构建失败')
    }
  }

  getPostsList() {
    return deepClone(this.postsList)
  }
}

class CategoriesManager {
  constructor(bm, sm) {
    this.bm = bm
    this.sm = sm

    this.categories = []

    this.readyPromise = Promise.resolve()
  }

  init() {
    this.readyPromise = new Promise((resolve, reject) => {
      getCategories().then((res) => {
        this.categories = res.categories
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getCategories() {
    return deepClone(this.categories)
  }

  saveCategories(categories) {
    return new Promise((resolve, reject) => {
      updateCategories(categories).then((res) => {
        this.categories = res.categories
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

class SuperManager {
  constructor(bm) {
    this.bm = bm

    this.dm = new DraftsManager(bm, this)
    this.pm = new PostsManager(bm, this)
    this.im = new ImagesManager(bm, this)
    this.cm = new CategoriesManager(bm, this)

    this.postsList = []

    /**
     * key = idEn
     * value = id
     */
    this.idEnMap = new Map()

    /**
     * key = id
     * value = idEn
     */
    this.idMap = new Map()

    this.readyPromise = Promise.resolve()
  }

  init() {
    this.cm.init()
    const p1 =  new Promise((resolve, reject) => {
      getPosts().then((res) => {
        this.postsInit(res)
        this.dm.init(this.postsList)
        this.pm.init(this.postsList)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
    const p2 = this.cm.readyPromise
    this.readyPromise = Promise.all([
      p1,
      p2
    ])
  }

  postsInit(list) {
    this.postsList =
    BlogManager.decorator.readingTime(
      BlogManager.decorator.time(
        BlogManager.decorator.to(
          BlogManager.decorator.wordCount(
            convertKeysToCamelCase(list)
          )
        )
      )
    )
    this.idEnMap.clear()
    this.idMap.clear()
    this.postsList.forEach((item) => {
      this.idEnMap.set(item.idEn, item.id)
      this.idMap.set(item.id, item.idEn)
    })
  }

  getPostsList() {
    return deepClone(this.postsList)
  }

  hasByIdEn(idEn) {
    return this.idEnMap.get(idEn) !== undefined
  }
}

export default SuperManager
