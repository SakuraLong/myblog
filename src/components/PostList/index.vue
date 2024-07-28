<template>
  <div
    class="flex gap padding"
    p-phone0="trbl"
    f-c
    g-2
  >
    <item
      v-for="post, i in posts"
      :key="i"
      :post="post"
    />
  </div>
</template>

<script>
import item from './item.vue'
export default {
  components: {
    item
  },
  props: {
    posts: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style>
</style>
