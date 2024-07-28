<template>
  <div
    class="flex gap padding font"
    f-c
    f-ai-c
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
import BlogManager from '@/BlogManager'
export default {
  data() {
    return {
      BlogManager
    }
  }
}
</script>

<style>
.footer {
  text-align: center;
  padding: 10px 0px;
}
</style>
