<template>
  <div
    class="flex gap padding"
    padding0="rbl"
    g-05
    f-c
  >
    <div
      v-for="data, i in consoleList"
      :key="i"
    >
      <el-tooltip
        :effect="theme"
        :content="data[1]"
        placement="left"
      >
        <router-link
          v-if="data[3]"
          class="link"
          :to="data[3]"
        >
          <el-icon :size="16">
            <component :is="data[0]" />
          </el-icon>
        </router-link>
        <el-icon
          v-else
          :size="16"
          pointer
          class="live2d-console-button"
          :data-console="data[2]"
          @click="clickButton(i)"
        >
          <component :is="data[0]" />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import ThemeManager from '@/assets/js/ThemeManager'
export default {
  data() {
    return {
      consoleList: [
        ['Tools', '设置', 'setting', '/menu/setting'],
        ['InfoFilled', '使用指南', 'about', '/post/about'],
        ['Switch', '换装', 'changeCostume'],
        ['User', '换人', 'changeModel'],
        ['CircleCloseFilled', '关闭', 'close']
      ],
      theme: new ThemeManager().useMode === 0 ? 'light' : 'dark'
    }
  },
  mounted() {
    new ThemeManager().on('change', this.themeChange, this)
  },
  beforeUnmount() {
    new ThemeManager().off('change', this.themeChange, this)
  },
  methods: {
    themeChange(data) {
      this.theme = data.useMode === 0 ? 'light' : 'dark'
    },
    clickButton(i) {
      switch (i) {
        case 3:
          this.$emit('changeModel')
          break
        case 2:
          this.$emit('changeCostume')
          break
        case 4:
          this.$emit('close')
          break
        default:
          break
      }
    }
  }
}
</script>

<style>
</style>
