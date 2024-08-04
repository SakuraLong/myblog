import PostsManager from './managers/postsManager'
import RouterManager from './managers/routerManager'
import CategoriesManager from './managers/categoriesManager'
import TagsManager from './managers/tagsManager'
import SuperManager from './managers/superManager'
import FontsManager from './managers/fontsManager'

import decorator from './decorator'

import data from './data'

import password from './password'

/**
 * 博客管理器
 *
 */

class BlogManager {
  static decorator = decorator
  static data = data
  static password = password
  static instance = null
  constructor() {
    if (BlogManager.instance !== null) return BlogManager.instance
    this.pm = new PostsManager(this)
    this.rm = new RouterManager(this)
    this.cm = new CategoriesManager(this)
    this.tm = new TagsManager(this)
    this.sm = new SuperManager(this)
    this.fm = new FontsManager(this)

    BlogManager.instance = this
  }

  getMsg(lang) {
    const res = [
      this.pm.getMsg(lang),
      this.cm.getMsg(lang),
      this.tm.getMsg(lang),
      this.pm.getPostsMsg(lang)
    ]
    return res
  }
}

export default BlogManager
