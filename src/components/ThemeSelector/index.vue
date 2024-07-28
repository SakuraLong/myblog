<template>
  <div
    class="theme-selector flex"
    f-ai-c
    no-select
  >
    <details ref="details">
      <summary
        class="border-button flex"
        bb-small
        f-ai-c
        pointer
      >
        <el-icon :size="18">
          <component :is="nowTheme[1]" />
        </el-icon>
        <span>Theme</span>
        <el-icon :size="18">
          <ArrowDown class="theme-selector__arrow-down" />
          <ArrowUp class="theme-selector__arrow-up" />
        </el-icon>
      </summary>
      <div :class="{'theme-selector__themes--absolubte': absolubte}">
        <div
          v-for="item, i in themes"
          :key="i"
          class="border-button flex"
          bb-small
          f-ai-c
          pointer
          @click="changeTheme(item[2])"
        >
          <el-icon :size="18">
            <component :is="item[1]" />
          </el-icon>
          <span>{{ item[0] }}</span>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
import ThemeSelector from './themeManager'
export default {
  props: {
    absolubte: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      themes: [
        ['OS Default', 'Tools', 2],
        ['Light', 'Sunny', 0],
        ['Dark', 'Moon', 1]
      ],
      nowTheme: ['OS Default', 'Tools', 2]
    }
  },
  created() {
    const ts = new ThemeSelector()
    this.nowTheme = this.themes.find((item) => item[2] === ts.themeMode)
  },
  mounted() {
    window.addEventListener('click', this.autoClose)
  },
  unmounted() {
    window.removeEventListener('click', this.autoClose)
  },
  methods: {
    changeTheme(themeMode) {
      const ts = new ThemeSelector()
      ts.changeTMTo(themeMode)
      this.nowTheme = this.themes.find((item) => item[2] === ts.themeMode)
      this.$refs.details.open = false
    },
    autoClose(e) {
      const details = this.$refs.details
      const summary = details.querySelector('summary')
      if (!summary.contains(e.target)) {
        details.open = false
      }
    }
  }
}
</script>

<style>
.theme-selector {
  color: var(--bl-color-primary-text);
}
.theme-selector > details {
  position: relative;
}
.theme-selector__themes--absolubte {
  border-radius: 5px;
  position: absolute;
  top: 100%;
  padding: 8px;
  border: 1px solid var(--bl-color-base-border);
  box-shadow: var(--bl-shadow-02);
  background-color: var(--bl-color-lighter-fill);
  width: 120px;
}
.theme-selector > details > summary,
.theme-selector > details > div > *{
  padding: 5px;
}
.theme-selector > details > summary > *:nth-child(n+2),
.theme-selector > details > div > * > *:nth-child(n+2) {
  margin-left: 5px;
}
.theme-selector > details .theme-selector__arrow-up {
  display: none;
}
.theme-selector > details[open] .theme-selector__arrow-down {
  display: none;
}
.theme-selector > details[open] .theme-selector__arrow-up {
  display: inline;
}
</style>
