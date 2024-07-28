<template>
  <Structure>
    <template #header>
      <Header />
    </template>
    <template #main>
      <div class="categories-main">
        <ACTTitle type="category" />
        <CategoriesDisplay />
        <ACTTitle
          v-show="category"
          ref="actTitle"
          type="custom"
          :custom="custom"
        />
        <PostListSmall
          v-show="category"
          ref="postListSmall"
          @changeSortOrder="changeSortOrder"
          @renderNav="renderNav"
        />
      </div>
    </template>
    <template #right>
      <PostsNav :list="navList" />
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Header from '@/components/Header'
import ACTTitle from '@/components/ACTTitle'
import BlogManager from '@/BlogManager'
import CategoriesDisplay from '@/components/CategoriesDisplay'
import PostListSmall from '@/components/PostListSmall'
import PostsNav from '@/components/PostsNav'
import store from '@/store'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    Header,
    ACTTitle,
    CategoriesDisplay,
    PostListSmall,
    PostsNav
  },
  data() {
    return {
      category: '',
      custom: {
        title: '',
        pre: 'ACTTitle.pre',
        amount: '',
        suf: 'ACTTitle.suf.post'
      },
      navList: []
    }
  },
  watch: {
    $route() {
      this.routeChange()
    }
  },
  mounted() {
    this.routeChange()
  },
  beforeUnmount() {
    scrollToTop()
  },
  methods: {
    routeChange() {
      const category = this.$route.query.category || ''
      this.category = category
      this.renderPosts(category)
    },
    renderPosts(category) {
      const bm = new BlogManager()
      const postsDeep = bm.cm.getPosts(category, true)
      const usePosts = bm.pm.sortByPublicationTime(store.state.categorySortOrder, postsDeep)
      this.custom.title = ['ACTTitle.title.category', ': ' + category]
      this.custom.amount = usePosts.length.toString()
      this.$refs.actTitle.renderCustom()
      this.$refs.postListSmall.render(usePosts, store.state.categorySortOrder, 'time')
    },
    changeSortOrder(sortOrder) {
      store.state.categorySortOrder = sortOrder
      this.renderPosts(this.category)
    },
    renderNav(list) {
      this.navList = list
    }
  }
}
</script>

<style>
.categories-main {
  padding: 20px;
  padding-top: 60px;
}
</style>
