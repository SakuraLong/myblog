<template>
  <div
    class="blog-footer flex gap padding font"
    f-c
    f-center
    g-small
  >
    <a
      class="link"
      l-hover
      :href="BlogManager.data.blog.beian[1]"
      target="_blank"
      rel="noopener"
      v-html="BlogManager.data.blog.beian[0]"
    />
    <span>©{{ BlogManager.data.blog.begin }} - {{ new Date().getFullYear() }}</span>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  data() {
    return {
      BlogManager
    }
  }
}
</script>

<style>
@media (min-width: 767px) {
  .blog-footer {
    min-height: 200px;
  }
}
</style>
