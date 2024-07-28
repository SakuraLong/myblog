<template>
  <div>
    <div>
      <h2 class="aside-h2">Tags</h2>
      <div>
        <CapsuleLinkButton
          v-for="tag, i in tags"
          :key="i"
          :to="'/tags?tag=' + tag"
          :name="tag"
        />
      </div>
    </div>
    <div>
      <h2 class="aside-h2">Categories</h2>
      <div>
        <CategoriesMini :categories="useCategories" />
      </div>
    </div>
  </div>
</template>

<script>
import CapsuleLinkButton from '@/components/CapsuleLinkButton'
import CategoriesMini from '@/components/CategoriesMini'
export default {
  components: {
    CapsuleLinkButton,
    CategoriesMini
  },
  props: {
    tags: {
      default: () => [],
      type: Array
    },
    categories: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    useCategories() {
      const res = []
      this.categories.forEach((cate, i) => {
        res.push({
          name: cate,
          to: (i === 0 ? cate : res[i - 1].to + '/' + cate)
        })
      })
      return res
    }
  }
}
</script>

<style>

</style>
