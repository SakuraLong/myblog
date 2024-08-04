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
import BlogManager from '@/assets/js/BlogManager'
import ThemeManager from '@/assets/js/ThemeManager'
export default {
  data() {
    return {
      tags: []
    }
  },
  created() {
    const ts = new ThemeManager()
    this.render(ts.useMode)
    ts.on('change', this.themeChange, this)
  },
  beforeUnmount() {
    const ts = new ThemeManager()
    ts.off('change', this.themeChange, this)
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
