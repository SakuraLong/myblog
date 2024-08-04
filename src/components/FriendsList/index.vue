<template>
  <div
    class="gap flex"
    f-w
    f-center
  >
    <item
      v-for="friend, i in friends"
      :key="i"
      :friend="friend"
    />
  </div>
</template>

<script>
import item from './item.vue'
import BlogManager from '@/assets/js/BlogManager'
export default {
  components: {
    item
  },
  data() {
    return {
      friends: BlogManager.data.friends.friends
    }
  }
}
</script>

<style>
</style>
