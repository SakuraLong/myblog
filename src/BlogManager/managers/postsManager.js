import LRUCache from '@/utils/lru'
import { getPost, getPosts } from '@/api/blog'
import { convertKeysToCamelCase, deepClone, message } from '@/utils/utils'
import BlogManager from '..'

class PostsManager {
  constructor(bm) {
    /**
     * blogManager
     */
    this.bm = bm

    /**
     * postsList
     * 简略的
     */
    this.postsList = []

    /**
     * 简略的posts图
     */
    this.briefPostsMap = new Map()

    /**
     * key = id
     * value = blog
     */
    this.posts = new LRUCache(50)

    /**
     * key = ieEn
     * value = id
     */
    this.idEnMap = new Map()

    this.readyPromise = new Promise((resolve, reject) => {
      getPosts().then((res) => {
        this.postsInit(res)
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })

    this.sortById = this.sort('id')
    this.sortByPublicationTime = this.sort('publicationTimeOrigin')
    this.sortByWordCount = this.sort('wordCount')
  }

  getPostsList() {
    return deepClone(this.postsList)
  }

  search(text) {
    text = text.trim()
    if (!text) return []
    const searchKeys = text.split(' ')
    const l = searchKeys.length
    const list = this.sortByPublicationTime(false)
    const idMap = new Set()
    function search(key) {
      const res = []
      list.forEach((post) => {
        if (idMap.has(post.id)) return
        for (let i = 0; i < l; i++) {
          if (post[key].indexOf(searchKeys[i]) === -1) return
        }
        res.push(post)
        idMap.add(post.id)
      })
      return res
    }
    const res1 = search('title')
    const res2 = search('abstract')
    return [
      ...res1,
      ...res2
    ]
  }

  postsInit(list) {
    list = convertKeysToCamelCase(list)
    this.postsList =
    BlogManager.decorator.readingTime(
      BlogManager.decorator.time(
        BlogManager.decorator.to(
          BlogManager.decorator.wordCount(
            list
          )
        )
      )
    )
    list.forEach((item) => {
      this.idEnMap.set(item.idEn, item.id)
      this.briefPostsMap.set(item.id, item)
    })
    this.bm.tm.initTags(list)
  }

  getBriefPostsById(id) {
    return this.briefPostsMap.get(id)
  }

  getPosts(page = 1, pageSize = 10) {
    const list = this.sortByPublicationTime(false)
    const amount = list.length
    const pages = Math.ceil(amount / pageSize)
    const posts = list.slice((page - 1) * pageSize, page * pageSize)
    return {
      posts,
      pages
    }
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
    const id = this.idEnMap.get(idEn)
    if (id) {
      return await this.getPostById(id)
    } else {
      throw new Error('idEn不存在或idEn-id表构建失败')
    }
  }

  getPostByIdEnSync(idEn) {
    const id = this.idEnMap.get(idEn)
    return this.getPostByIdSync(id)
  }

  getLastAndNextById(id) {
    const list = this.sortById()
    const amount = list.length
    const index = list.findIndex((item) => item.id === id)
    let last = null
    let next = null
    if (index !== -1) {
      last = index === 0 ? list[list.length - 1] : list[index - 1]
      next = index === amount - 1 ? list[0] : list[index + 1]
    }
    return {
      last,
      next
    }
  }

  sort(key) {
    return function(ascendingOrder = true, useList = null) {
      const tlist = useList || this.postsList
      const list = deepClone(tlist)
      if (ascendingOrder) {
        list.sort((a, b) => a[key] - b[key])
      } else {
        list.sort((a, b) => b[key] - a[key])
      }
      return list
    }
  }

  sortByIdEn(ascendingOrder = true, useList = null) {
    const tlist = useList || this.postsList
    const list = deepClone(tlist)
    if (ascendingOrder) {
      list.sort((a, b) => a.idEn.localeCompare(b.idEn))
    } else {
      list.sort((a, b) => b.idEn.localeCompare(a.idEn))
    }
    return list
  }

  sortByTitlePinyin(ascendingOrder = true, useList = null) {
    const tlist = useList || this.postsList
    const list = deepClone(tlist)
    if (ascendingOrder) {
      list.sort((a, b) => a.titlePinyin.localeCompare(b.titlePinyin))
    } else {
      list.sort((a, b) => b.titlePinyin.localeCompare(a.titlePinyin))
    }
    return list
  }

  getMsg() {
    return {
      title: 'BlogMessage.posts',
      msg: this.getPostsList().length.toString()
    }
  }

  getPostsMsg(lang) {
    const dict = {
      'zh-Hans': [1000, 10000],
      'en': [1000, 1000]
    }
    const words = dict[lang] || [1000, 10000]
    function analyse(num) {
      if (num < words[0]) {
        return [num.toString(), 'BlogMessage.wordCount.words1']
      } else if (num < words[1]) {
        return [parseFloat((num / words[0]).toFixed(1)).toString(), 'BlogMessage.wordCount.words2']
      } else {
        return [parseFloat((num / words[1]).toFixed(1)).toString(), 'BlogMessage.wordCount.words3']
      }
    }
    const wordCount = this.getPostsList().reduce((pre, cur) => {
      return pre + cur.wordCount
    }, 0)
    return {
      title: 'BlogMessage.wordCount.title',
      msg: analyse(wordCount)
    }
  }
}

export default PostsManager
