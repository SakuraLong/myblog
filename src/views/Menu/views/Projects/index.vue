<template>
  <div class="menu-projects">
    <ProjectsList
      :projects="data.projects"
      :categories="data.categories"
    />
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
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
.menu-projects {
  padding: 10px 20px;
  color: var(--bl-color-primary-text);
}
</style>
