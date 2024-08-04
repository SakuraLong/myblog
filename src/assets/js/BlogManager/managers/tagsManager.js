class TagsManager {
  constructor(bm) {
    /**
     * blogManager
     */
    this.bm = bm

    /**
     * key = tag
     * value = [postid1, postid2, ...]
     */
    this.tagsMap = new Map()
  }
  initTags(posts) {
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        if (!this.tagsMap.has(tag)) this.tagsMap.set(tag, [])
        this.tagsMap.get(tag).push(post.id)
      })
    })
  }

  getTags() {
    return Array.from(this.tagsMap.entries()).map((item) => {
      return {
        name: item[0],
        amount: item[1].length
      }
    })
  }

  getPosts(tag) {
    const list = this.tagsMap.get(tag) || []
    return list.map((item) => this.bm.pm.getBriefPostsById(item))
  }

  getHotTags() {
    const tags = this.getTags()
    tags.sort((a, b) => b.amount - a.amount)
    return tags.slice(0, 10)
  }

  getMsg() {
    return {
      title: 'BlogMessage.tags',
      msg: this.getTags().length.toString()
    }
  }
}

export default TagsManager
