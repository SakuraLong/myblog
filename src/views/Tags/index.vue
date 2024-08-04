<template>
  <Structure>
    <template #header>
      <Header />
    </template>
    <template #main>
      <div class="tags-main">
        <ACTTitle type="tag" />
        <TagsDisplay />
        <ACTTitle
          v-show="tag"
          ref="actTitle"
          type="custom"
          :custom="custom"
        />
        <PostListSmall
          v-show="tag"
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
import BlogManager from '@/assets/js/BlogManager'
import TagsDisplay from '@/components/TagsDisplay'
import ACTTitle from '@/components/ACTTitle'
import PostListSmall from '@/components/PostListSmall'
import PostsNav from '@/components/PostsNav'
import store from '@/store'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    Header,
    TagsDisplay,
    ACTTitle,
    PostListSmall,
    PostsNav
  },
  data() {
    return {
      tag: '',
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
      const tag = this.$route.query.tag || ''
      this.tag = tag
      this.renderPosts(tag)
    },
    renderPosts(tag) {
      const bm = new BlogManager()
      const posts = bm.tm.getPosts(tag)
      const usePosts = bm.pm.sortByPublicationTime(store.state.tagSortOrder, posts)
      this.custom.title = ['ACTTitle.title.tag', ': ' + tag]
      this.custom.amount = usePosts.length.toString()
      this.$refs.actTitle.renderCustom()
      this.$refs.postListSmall.render(usePosts, store.state.tagSortOrder, 'time')
    },
    changeSortOrder(sortOrder) {
      store.state.tagSortOrder = sortOrder
      this.renderPosts(this.tag)
    },
    renderNav(list) {
      this.navList = list
    }
  }
}
</script>

<style>
.tags-main {
  padding: 20px;
  padding-top: 60px;
  min-height: calc(100vh - 60px - 20px);
}
</style>
