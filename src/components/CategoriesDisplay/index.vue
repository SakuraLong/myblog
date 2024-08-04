<template>
  <div
    class="flex gap"
    f-c
    g-07
  >
    <cdItem
      v-for="item, i in categories"
      :key="i"
      :item="item"
    />
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
import cdItem from './cdItem.vue'
export default {
  components: {
    cdItem
  },
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    const category = this.$route.query.category || ''
    this.categories = BlogManager.decorator.categoriesUnfold(new BlogManager().cm.getCategories(), category)
  }
}
</script>

<style>

</style>
