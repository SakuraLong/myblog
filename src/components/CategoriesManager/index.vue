<template>
  <div class="font padding">
    <div
      class="flex gap"
      f-c
    >
      <cdItem
        v-for="_, i in categories"
        :key="i"
        v-model:item="categories[i]"
        :index="i"
        :all="categories.length"
        @removeChild="removeChild"
        @upChild="upChild"
        @downChild="downChild"
      />
    </div>
    <footer
      class="flex"
      f-center
    >
      <div
        class="padding border-button"
        pointer
        p-mini
        @click="save"
      >save</div>
    </footer>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
import cdItem from './cdItem.vue'
import { deepClone, message } from '@/utils/utils'
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
    this.categories = BlogManager.decorator.categoriesUnfold(new BlogManager().sm.cm.getCategories(), '')
  },
  methods: {
    save() {
      new BlogManager().sm.cm.saveCategories(this.categories).then((res) => {
        this.categories = deepClone(res.categories)
        message('更新成功', 'success')
      }).catch((err) => {
        message(err)
      })
    },
    removeChild(i) {
      this.categories.splice(i, 1)
    },
    upChild(i) {
      if (i === 0) return
      const child = this.categories[i]
      this.categories.splice(i, 1)
      this.categories.splice(i - 1, 0, child)
    },
    downChild(i) {
      if (i === this.categories.length - 1) return
      const child = this.categories[i]
      this.categories.splice(i, 1)
      this.categories.splice(i + 1, 0, child)
    }
  }
}
</script>

<style>

</style>
