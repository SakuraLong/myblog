<template>
  <div
    class="flex"
    f-ai-c
  >
    <router-view :key="refreshKey" />
    <Selector />
  </div>
</template>

<script>
import Selector from '@/components/Selector'
import ThemeSelector from '@/components/ThemeSelector/themeManager'
import BlogManager from './BlogManager'
export default {
  components: {
    Selector
  },
  computed: {
    refreshKey() {
      if (this.$route.meta && this.$route.meta.refresh) {
        const p = this.$route.fullPath.indexOf('#')
        const key = p === -1 ? this.$route.fullPath : this.$route.fullPath.slice(0, p)
        return key
      }
      return ''
    },
    title() {
      const str = BlogManager.data.blog.name
      if (this.$route.meta && this.$route.meta.title) {
        return this.$route.meta.title + str
      }
      return str
    }
  },
  watch: {
    title(n) {
      document.title = n
    }
  },
  created() {
    new ThemeSelector() // 初始化
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const str = BlogManager.data.blog.name
      if (this.$route.meta && this.$route.meta.title) {
        document.title = this.$route.meta.title + str
      } else {
        document.title = str
      }
    }
  }
}
</script>

<style>

</style>
