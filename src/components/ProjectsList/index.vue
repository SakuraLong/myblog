<template>
  <div class="projects-list">
    <div
      v-for="ps, i in list"
      :key="i"
    >
      <h3 t-center>{{ $t(ps[1].name) }}</h3>
      <div
        class="flex gap"
        f-w
        f-jc-c
      >
        <item
          v-for="p, j in ps[1].list"
          :key="j"
          :project="p"
        />
      </div>
    </div>
  </div>
</template>

<script>
import item from './item.vue'
export default {
  components: {
    item
  },
  props: {
    projects: {
      default: () => [],
      type: Array
    },
    categories: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    list() {
      const map = new Map()
      this.categories.forEach((category) => {
        map.set(category[0], {
          name: category[1],
          list: []
        })
      })
      this.projects.forEach((project) => {
        if (map.has(project.category)) map.get(project.category).list.push(project)
      })
      const list = Array.from(map.entries())
      return list
    }
  }
}
</script>

<style>
</style>
