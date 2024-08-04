<template>
  <div
    class="flex"
    f-ai-c
  >
    <router-view :key="refreshKey" />
    <Selector />
    <Live2D
      v-if="live2DShow && width >= 1280"
      :pos="live2Dpos"
      direction="x"
      @close="close"
    />
  </div>
</template>

<script>
import Selector from '@/components/Selector'
import ThemeManager from './assets/js/ThemeManager'
import Live2D from '@/components/Live2D'
import BlogManager from '@/assets/js/BlogManager'
export default {
  components: {
    Selector,
    Live2D
  },
  data() {
    return {
      live2Dpos: {
        left: '950px',
        bottom: '0'
      },
      width: 0,
      live2DShow: true
    }
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
    new ThemeManager() // 初始化
  },
  mounted() {
    this.init()
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    init() {
      const str = BlogManager.data.blog.name
      if (this.$route.meta && this.$route.meta.title) {
        document.title = this.$route.meta.title + str
      } else {
        document.title = str
      }
    },
    resize() {
      this.width = window.innerWidth
    },
    close() {
      this.live2DShow = false
    }
  }
}
</script>

<style>

</style>
