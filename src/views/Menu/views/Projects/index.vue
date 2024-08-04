<template>
  <div class="menu-child">
    <ProjectsList
      :projects="data.projects"
      :categories="data.categories"
    />
  </div>
</template>

<script>
import BlogManager from '@/assets/js/BlogManager'
import ProjectsList from '@/components/ProjectsList'
import { scrollToTop } from '@/utils/utils'
export default {
  components: {
    ProjectsList
  },
  data() {
    return {
      data: BlogManager.data.projects
    }
  },
  beforeUnmount() {
    scrollToTop()
  }
}
</script>

<style>
</style>
