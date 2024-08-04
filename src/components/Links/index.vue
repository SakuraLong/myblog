<template>
  <div
    class="flex gap"
    g-small
    f-c
  >
    <mylink
      v-for="link, i in links"
      :key="i"
      :link="link"
    />
  </div>
</template>

<script>
import link from './link.vue'
import BlogManager from '@/assets/js/BlogManager'
export default {
  components: {
    mylink: link
  },
  data() {
    return {
      links: BlogManager.data.personalInfo.links
    }
  }
}
</script>

<style>

</style>
