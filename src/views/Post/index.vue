<template>
  <Structure :aside-padding="false">
    <template #left>
      <Nav />
      <TagsAndCates
        :tags="postData.tags"
        :categories="postData.categories"
      />
      <CategoriesSmall />
    </template>
    <template #right>
      <div>
        <MdToc
          :ast="ast"
          :toc-html="tocHtml"
        />
      </div>
    </template>
    <template #main>
      <div class="post-main">
        <PostTitle
          :post="postData"
          :link="false"
        />
        <MdRenderer
          :id-en="idEn"
          :text="text"
          @renderToc="renderToc"
        />
        <CC :post="postData" />
        <MdFooter :id="id" />
      </div>
    </template>
  </Structure>
</template>

<script>
import Structure from '@/components/Structure'
import Nav from '@/components/Nav'
import MdRenderer from '@/components/MdRenderer'
import MdToc from '@/components/MdToc'
import PostTitle from '@/components/PostTitle'
import CategoriesSmall from '@/components/CategoriesSmall'
import TagsAndCates from '@/components/TagsAndCates'
import MdFooter from '@/components/MdFooter'
import BlogManager from '@/assets/js/BlogManager'
import CC from '@/components/CC'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    Structure,
    Nav,
    MdRenderer,
    MdToc,
    PostTitle,
    CategoriesSmall,
    TagsAndCates,
    MdFooter,
    CC
  },
  data() {
    return {
      text: '',
      tocHtml: '',
      id: 0,
      idEn: '',
      ast: {},
      postData: {
        title: '',
        publicationTime: '',
        modificationTime: '',
        wordCount: '',
        readingTime: '',
        tags: [],
        categories: []
      }
    }
  },
  created() {
    const path = this.$route.params.pathMatch[0]
    const post = new BlogManager().pm.getPostByIdEnSync(path)
    this.postData = post.post
    this.text = post.post.body
    this.idEn = post.post.idEn
    this.id = post.post.id
  },
  mounted() {
    this.$nextTick(() => {
      const hash = window.location.hash
      if (hash !== '' && document.getElementById(hash.slice(1))) document.getElementById(hash.slice(1)).scrollIntoView()
    })
    document.title = this.postData.title
  },
  beforeUnmount() {
    scrollToTop()
  },
  methods: {
    renderToc(tocHtml, ast) {
      this.tocHtml = tocHtml
      this.ast = ast
    }
  }
}
</script>

<style>
.post-main {
  padding-top: 40px;
}
</style>
