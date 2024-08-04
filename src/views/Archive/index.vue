<template>
  <Structure>
    <template #header>
      <Header />
    </template>
    <template #left>
      <ArchiveSelector
        :select-list="selectList"
        :selected="selected"
        @select="select"
      />
    </template>
    <template #right>
      <PostsNav :list="navList" />
    </template>
    <template #main>
      <div class="archive-main">
        <ACTTitle type="archive" />
        <PostListSmall
          ref="postListSmall"
          @changeSortOrder="changeSortOrder"
          @renderNav="renderNav"
        />
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import BlogManager from '@/assets/js/BlogManager'
import Header from '@/components/Header'
import PostListSmall from '@/components/PostListSmall'
import PostsNav from '@/components/PostsNav'
import ArchiveSelector from '@/components/ArchiveSelector'
import ACTTitle from '@/components/ACTTitle'
import { scrollToTop } from '@/utils/utils'

export default {
  components: {
    Structure,
    Header,
    PostListSmall,
    PostsNav,
    ArchiveSelector,
    ACTTitle
  },
  data() {
    return {
      order: true,
      navList: [],
      selectList: [
        { name: 'ArchiveSelector.time', id: 0, type: 'time' },
        { name: 'ArchiveSelector.wordCount', id: 1, type: 'wordCount' },
        { name: 'ArchiveSelector.pinyin', id: 2, type: 'pinyin' },
        { name: 'ArchiveSelector.idEn', id: 3, type: 'idEn' }
      ],
      selected: 0,
      renderFunc: []
    }
  },
  watch: {
    order() {
      this.render()
    },
    selected() {
      this.render()
    }
  },
  mounted() {
    const bm = new BlogManager()
    this.renderFunc = [
      bm.pm.sortByPublicationTime,
      bm.pm.sortByWordCount,
      bm.pm.sortByTitlePinyin,
      bm.pm.sortByIdEn
    ]
    this.render()
  },
  beforeUnmount() {
    scrollToTop()
  },
  methods: {
    changeSortOrder(order) {
      this.order = order
    },
    render() {
      const type = this.selectList[this.selected].type
      this.$refs.postListSmall.render(this.renderFunc[this.selected].call(new BlogManager().pm, this.order), this.order, type)
    },
    renderNav(list) {
      this.navList = list
    },
    select(id) {
      this.selected = id
    }
  }
}
</script>

<style>
.archive-aside {
  height: 50%;
  background-color: aqua;
}
.archive-main {
  padding: 20px;
  padding-top: 60px;
}
</style>
