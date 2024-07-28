<template>
  <div class="tags-display">
    <div>
      <router-link
        v-for="tag, i in tags"
        :key="i"
        class="link tags-display__link"
        :to="'tags?tag=' + tag.name"
        :style="{'--size': tag.size.toString() + 'px', '--color': tag.color }"
      >
        <span>
          {{ tag.name }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import BlogManager from '@/BlogManager'
import ThemeSelector from '../ThemeSelector/themeManager'
export default {
  data() {
    return {
      tags: []
    }
  },
  created() {
    const ts = new ThemeSelector()
    this.render(ts.useMode)
    ts.event.addEventListener('change', this.themeChange)
  },
  beforeUnmount() {
    const ts = new ThemeSelector()
    ts.event.removeEventListener('change', this.themeChange)
  },
  methods: {
    themeChange(data) {
      this.render(data.useMode)
    },
    render(useMode) {
      const colors = ['#303133', '#E5EAF3']
      const color = colors[useMode]
      this.tags = BlogManager.decorator.tagsColor(color, '#4FADFF', BlogManager.decorator.tagsSize(new BlogManager().tm.getTags()))
    }
  }
}
</script>

<style>
.tags-display__link {
  font-size: var(--size);
  color: var(--color) !important;
  padding: 10px;
  display: inline-block;
}
.tags-display__link:hover {
  text-decoration: underline;
}
</style>
