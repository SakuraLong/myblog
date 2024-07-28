import { getCategories } from '@/api/blog'
import { deepClone } from '@/utils/utils'

class CategoriesManager {
  constructor(bm) {
    this.bm = bm

    /**
     * Categories
     */
    this.categories = []

    /**
     * key category1/category2
     * value [postid1, postid2, ...]
     */
    this.categoriesMap = new Map()

    /**
     * key postid
     * value category1/category2
     */
    this.idMap = new Map()

    this.readyPromise = new Promise((resolve, reject) => {
      getCategories().then((res) => {
        this.initCategories(res).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  reload() {
    this.readyPromise = new Promise((resolve, reject) => {
      getCategories().then((res) => {
        this.initCategories(res).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }

  async initCategories(list) {
    const categories = list.categories
    this.categories = categories
    this.categories.push({
      name: '未分组',
      params: '未分组',
      children: []
    })
    const stack = []
    this.categoriesMap.set('未分组', [])
    const dfs = (categories) => {
      categories.forEach((category) => {
        stack.push(category.name)
        category.params = stack.join('/')
        this.categoriesMap.set(category.params, [])
        dfs(category.children)
        stack.pop()
      })
    }
    dfs(categories)

    // 需要等postlist获取
    //
    await this.bm.pm.readyPromise
    const postsList = this.bm.pm.getPostsList()
    postsList.forEach((post) => {
      const categories = post.categories.reduce((pre, cur) => {
        const last = pre.at(-1) || ''
        pre.push(last === '' ? cur : last + '/' + cur)
        return pre
      }, [])
      categories.forEach((category, i) => {
        if (this.categoriesMap.has(category)) {
          this.categoriesMap.get(category).push({
            id: post.id,
            deep: categories.length - 1 === i
          })
        } else {
          if (this.categoriesMap.get('未分组').find((item) => item.id === post.id) === undefined) {
            this.categoriesMap.get('未分组').push({
              id: post.id,
              deep: true
            })
          }
        }
      })
    })
  }

  getCategories() {
    /**
     * return like
     * [{
     *  name: 'xxx',
     *  params: 'xxx',
     *  children: [{}, {}, ...]
     * }, {}, ...]
     */
    return deepClone(this.categories)
  }

  getPosts(category, deep = false) {
    const list = this.categoriesMap.get(category) || []
    const useList = list.filter((item) => deep || item.deep).map((item) => item.id)
    return useList.map((item) => this.bm.pm.getBriefPostsById(item))
  }

  getMsg() {
    return {
      title: 'BlogMessage.categories',
      msg: this.getCategories().length.toString()
    }
  }
}

export default CategoriesManager
