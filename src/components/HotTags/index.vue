<template>
  <div
    class="flex gap"
    f-c
  >
    <h3
      class="about-h3 font"
      s-biger
    >{{ $t('HotTags.title') }}</h3>
    <div
      class="flex gap"
      f-w
      g-small
    >
      <router-link
        v-for="tag, i in tags"
        :key="i"
        class="font link block"
        f-big
        uline-hover
        :to="'/tags?tag=' + tag.name"
      >
        {{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
export default {
  data() {
    return {
      tags: []
    }
  },
  created() {
    this.tags = new BlogManager().tm.getHotTags()
  }
}
</script>

<style>
</style>
