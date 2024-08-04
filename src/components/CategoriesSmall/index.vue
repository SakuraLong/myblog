<template>
  <div>
    <h2 class="aside-h2">All Categories</h2>
    <div
      class="categories-small"
      no-select
    >
      <myol :categories="categories" />
    </div>
  </div>
</template>

<script>
import myol from './myol.vue'
import BlogManager from '@/assets/js/BlogManager'
export default {
  components: {
    myol
  },
  data() {
    return {
      categories: []
    }
  },
  created() {
    const bm = new BlogManager()
    this.categories = bm.cm.getCategories()
  }
}
</script>

<style>
.categories-small {
  color: var(--bl-color-regular-text) !important;
}
.categories-small a {
  text-decoration: none;
  color: var(--bl-color-regular-text) !important;
}
.categories-small a:hover {
  text-decoration: underline;
}
.categories-small ol {
  padding-inline-start: 20px;
}
.categories-small > ol {
  padding-inline-start: 0px !important;
}
.categories-small li {
  list-style: none;
}
.categories-small li,
.categories-small details[open] > summary {
  margin-bottom: 20px;
}
</style>
