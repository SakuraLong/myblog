<template>
  <TopStructure>
    <template #aside>
      <About />
    </template>
    <template #main>
      <PostList :posts="posts" />
      <Pagination
        :page="page"
        :page-count="pageCount"
      />
    </template>
  </TopStructure>
</template>

<script>
import TopStructure from '@/components/TopStructure'
import PostList from '@/components/PostList'
import BlogManager from '@/BlogManager'
import router from '@/router'
import Pagination from '@/components/Pagination'
import About from '@/components/About'
export default {
  components: {
    TopStructure,
    PostList,
    Pagination,
    About
  },
  data() {
    return {
      posts: [],
      page: 1,
      pageCount: 1
    }
  },
  mounted() {
    const bm = new BlogManager()
    let page = 1
    // home 下不会进入该if，不会死循环
    if (this.$route.params && this.$route.params.pagination) {
      page = parseInt(this.$route.params.pagination)
      console.log('page', page)
      if (isNaN(page) || Math.max(1, page) === 1) {
        router.push({
          name: 'home'
        })
      }
    }
    const res = bm.pm.getPosts(page, 8)
    if (res.pages < page && res.pages !== 0) {
      router.push({
        path: '/page/' + res.pages.toString()
      })
    }
    this.page = page
    this.pageCount = res.pages
    this.posts = res.posts
  }
}
</script>

<style>
</style>
